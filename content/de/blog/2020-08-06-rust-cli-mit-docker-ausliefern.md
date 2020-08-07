---
title: "Rust CLI mit Docker ausliefern"
intro_text: ""
type: blog
categories:
    - code
tags:
    - rust
    - docker
    - cli
date: "2020-08-06"
lastmod: "2020-08-06"
---

Vor kurzem habe ich einen Weg gefunden Rust {{< abbr "CLI" "Command Line Interfaces; Programme die in einem Terminal ausgeführt werden" >}} Programme über Docker auszuliefern. Für meinen Arbeitgeber [Synoa](https://synoa.de) habe ich in den letzten Monaten ein CLI Tool erstellt, dass mir - und anderen - die Arbeit mit AWS erleichtert. Diese CLI im Team zu verteilen gestaltete sich als schwierig da weder jeder Rust installiert hat noch eine einfache Integration mit [Homebrew](https://brew.sh) möglich war da der Code in einem privaten Repository ist. Die einfachste Lösung war am Ende, die CLI in einen Docker Container zu packen und so zu verteilen. Wie das geht erkläre ich in diesem Artikel.

## Rust Code

Der folgende Beispiel Code zeigt ein kleines Rust Programm, dass die Argumente ausgibt die während der Ausführung übergeben wurden.

```rust
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    println!("{:?}", args);
}
```

Der Code muss nicht verstanden werden um die Konzepte aus diesem Artikel zu verstehen! Das Muster ist für alle Binary-Programme gleich, z.B. könnte genauso eine Go App über Docker verteilt werden.

## Code kompilieren - in Docker

Den oben gezeigten Code können wir nun kompilieren, dass heißt ihn zu einer ausführbaren Binär-Datei "zusammenfügen". Hierfür verwenden wir einen ["Multi-Stage" Build](https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds) in Docker. So müssen wir und andere Entwickler keine vollständige Rust Umgebung verwalten und außerdem kann jeder Entwickler über Docker in der selben Umgebung Binaries kompilieren.

Zunächst deklarieren wir einen `builder` Container. Dieser Container wird genutzt um unseren Rust Code zu kompilieren.

```Dockerfile
FROM clux/muslrust:1.45.0-stable as builder
WORKDIR /volume
COPY . .
RUN cargo build --release
```

Diese vier Zeilen tun folgendes:

- Erstelle einen Container auf Basis von [`clux/muslrust`](https://github.com/clux/muslrust)
- Dem Container wird der "Name" `builder` gegeben
- Das Arbeitsverzeichnis wird auf `/volume` gesetzt, damit wird Docker alle Befehle in diesem Verzeichnis ausführen
- Alle Dateien werden aus dem aktuellen Verzeichnis in den Container kopiert
- Das Kommando `cargo build --release` wird _im Container_ ausgeführt und kompiliert unseren Code

## Das eigentliche Docker Image erzeugen

Nun können wir im selben Dockerfile unser eigentliches Image erzeugen. Dafür wird das kompilierte Binary aus dem `builder` container kopiert.

```Dockerfile
FROM alpine
# Kopiere das kompilierte Binary aus dem builder container
COPY --from=builder /volume/target/x86_64-unknown-linux-musl/release/docker-cli-sample .
# Alle CLI argumente werden direkt an das Binary übergeben
ENTRYPOINT [ "/docker-cli-sample" ]
```

Was geschieht hier?

- Zuerst erstellen wir einen neuen Docker Container auf basis des [Alpine Linux](https://alpinelinux.org/) Images.
- Dann kopieren wir das kompilierte Binary _aus dem builder Container_ in unseren neuen Container
- Zuletzt sagen wir, dass das Binary als "Startpunkt" verwendet werden soll. Soll heißen wenn der Container gestartet wird, dann wird dieses Binary ausgeführt

Warum Alpine Linux? Alpine Linux ist eine kleine auf Sicherheit fokusierte Linux Distribution. Das Alpine Docker image ist nur ca. 3MB groß - kleiner geht kaum!

Alles zusammen sieht unser Dockerfile nun wie folgt aus:

```Dockerfile
FROM clux/muslrust:1.45.0-stable as builder
WORKDIR /volume
COPY . .
RUN cargo build --release

FROM alpine
COPY --from=builder /volume/target/x86_64-unknown-linux-musl/release/docker-cli-sample .
ENTRYPOINT [ "/docker-cli-sample" ]
```

## Image bauen und den Container ausführen

Mit dem oben gezeigten Dockerfile können wir nun ein Image bauen. Hierfür benutzen wir folgenden Befehl:

```bash
docker build -t kevingimbel/rust-docker-cli-sample:1.0 .  
```

Anschließend können wir einen Container ausführen, der das neu erstellte Image benutzt:

```bash
$ docker run --rm kevingimbel/rust-docker-cli-sample:1.0 -hello -world
["/docker-cli-sample", "-hello", "-world"]
```

## Terminal konfiguration

Damit wir diesen Docker Container wie ein "normales" binary ausführen können müssen wir im Terminal ein "alias" setzen. Hierfür kommt folgende in die `~/.bashrc` bzw. `~/.zshrc`.

```bash
alias docker-rust-cli='docker run --rm kevingimbel/rust-docker-cli-sample:1.0'
```

Nun laden wir die Konfigurationsdatei neu oder öffnen ein neues Terminal Fenster und dann kann der Container wie ein normales Script ausgeführt werden.

```bash
# bash
source ~/.bashrc
# zsh
source ~/.zshrc
```

Danach können wir den Container mit dem Befehl `docker-rust-cli` starten.

```bash
$ docker-rust-cli hello from docker
["/docker-cli-sample", "hello", "from", "docker"]
```

## Fortgeschritten: Volumes

Wir könnten hier fertig sein, aber eine wichtige Funktion fehlt noch: Volumes. Wenn unser CLI tool Dateien erstellt würden diese sonst im Docker container bleiben und der wird standardmäßig gelöscht da wir `--rm` verwenden.

Der `alias` wird also mit einem Volume angepasst.

```bash
alias docker-rust-cli='docker run --rm -v $(pwd):/cmd-root-dir kevingimbel/rust-docker-cli-sample:1.0'
```

Mit `-v $(pwd):/cmd-root-dir` sagen wir Docker, dass das aktuelle Verzeichnis (`$(pwd)`) im Container als Pfad `/cmd-root-dir` gemounted werden soll. Jetzt müssen wir nur noch unserem Image sagen, dass es Dateien auch in diesem Verzeichnis ablegen soll. Das geht indem wir in der Dockerfile die `WORKDIR` setzen.

Das Dockerfile sieht nun wie folgt aus.

```Dockerfile
FROM clux/muslrust:1.45.0-stable as builder
WORKDIR /volume
COPY . .
RUN cargo build --release

FROM alpine
COPY --from=builder /volume/target/x86_64-unknown-linux-musl/release/docker-cli-sample .
WORKDIR /cmd-root-dir
ENTRYPOINT [ "/docker-cli-sample" ]
```

`WORKDIR` erstellt das Verzeichnis wenn es nicht existiert, wir müssen es also nicht selbst erstellen. Um diese Anpassung zu testen können wir unser Script eine Log Datei schreiben lassen. Dazu verändern wir den Rust Code wie folgt.

```rust
use std::env;
use std::fs;

fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    println!("{:?}", args);
    fs::write("docker-cli-sample.log", format!("Args: {:?}", args))?;
    Ok(())
}
```

Mit `fs::write` schreiben wir nun alle Argumente auch in die Datei `docker-cli-sample.log` statt sie nur im Terminal anzuzeigen. Jetzt muss das Verzeichnis nur noch wie oben geschrieben gemounted werden:

```bash
alias docker-rust-cli='docker run --rm -v $(pwd):/cmd-root-dir kevingimbel/rust-docker-cli-sample:1.0'
```

Wichtig sind hierbei die einfachen Anführungszeichen (`'`) - ohne diese würde `$(pwd)` nur ein Mal ausgeführt werden statt bei jedem Aufruf!

Wenn wir jetzt den Befehl ausführen wird eine Log Datei in das aktuelle Verzeichnis geschrieben:

```bash
$ docker-rust-cli
["/docker-cli-sample", "hello", "world"]
$ cat docker-cli-sample.log
Args: ["/docker-cli-sample", "hello", "world"]
```

## Fortgeschritten: Versionierung

Für etwas mehr Komfort können wir eine Variable für den "Docker Tag", also die Version unseres Images, nutzen. So kann man später einfach updaten ohne den eigentlichen Befehl anpassen zu müssen.

```bash
export MY_CLI_VERSION="1.0"
alias docker-rust-cli='docker run --rm -v $(pwd):/cmd-root-dir kevingimbel/rust-docker-cli-sample:$MY_CLI_VERSION'
```

Soll nun Version 1.1 verwendet werden muss lediglich die Variable `MY_CLI_VERSION` auf `1.1` geändert werden. Jeder mit Zugriff auf das Docker Image kann nun den Code in die `~/.bashrc` oder `~/.zshrc` kopieren und das CLI Programm nutzen.

## Zusammenfassung

- Wir können mit [Multi-Stage Builds](https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds "Docker Dokumentation über Multi-Stage Builds") code in Docker kompilieren
- Rust binaries können in kleinen Containern wie z.B. Alpine oder "blanken" Container ausgeführt werden
- Mit einem `alias` können wir bequem und komfortable Docker Container ausführen als wären es "installiere" Binaries
- Indem wir `WORKDIR` und Volumes nutzen können wir Dateien aus dem Container heraus speichern

Der Quellcode für dieses Tutorial kann auf [GitHub unter kevingimbel/docker-cli-sample](https://github.com/kevingimbel/docker-cli-sample) gefunden werde. Ein funktionierendes Docker Image gibt es auf [Docker Hub unter kevingimbel/rust-docker-cli-sample](https://hub.docker.com/r/kevingimbel/rust-docker-cli-sample). 

Um das Docker Image zu nutzen kann folgender Befehl ausgeführt werden:

```bash
docker run --rm kevingimbel/rust-docker-cli-sample:1.0 hello from docker
```