---
title: "Rust Compiler Umgebungsvariablen"
intro_text: ""
type: blog
categories:
    - code
tags:
    - rust
    - cargo
    - compiler
date: "2020-09-30"
lastmod: "2020-09-30"
---

[Rust](https://rust-lang.org) ist eine wunderbare Programmiersprache mit einem gut durchdachten Compiler. Das Rust Team hat sich die Bürde auferlegt, den Compiler so "schlau" wie möglich zu machen um so viele Fehler schon während dem kompilieren des Codes zu erkennen. Außerdem wird Rust mit einem mächtigen Tool namens `cargo` ausgeliefert. Cargo ist ähnlich wie `npm` oder `maven` und stellt verschiedenste Funktionen bereit, zum Beispiel zum bauen, testen, oder veröffentlichen von Rust Code. In diesem Blog-Beitrag möchte ich auf ein Build Feature von Cargo eingehen: Environment Variables.

## Source Code

Der gesamte Source Code für diesen Blog-Beitrag kann auf GitHub gefunden werden: [github.com/kevingimbel/rust-blog-code/env-example](https://github.com/kevingimbel/rust-blog-code/tree/main/env-example).

Einige Code Beispiele können direkt ausgeführt werden. Anweisung wie z.B. `cargo run --examples ding` in diesem Beitrag führen die verschiedenen Code Beispiele im `examples` Ordner aus. Um diese zu verwenden, folgende Schritten ausführen:

1. Terminal öffnen
2. Repo clonen
3. `cd env-example`
4. Befehle ausführen wenn sie im Beitrag vorkommen, z.B. `cargo run --example maybe-fn`

## `env!()` vs. `std::env::var()`

Umgebungsvariablen können auf zwei Arten ausgelesen werden:

- `env!()` Makro
- `std::env::var()` Funktion

Der wichtige Unterschied ist, dass `env!()` den **Wert zur Kompilierzeit** ausliest und ins Binary schreibt, während `std::env()` immer den Wert aus der Umgebung liest. Das lässt sich am folgenden Beispiel gut erkennen:

```rust
fn main() {
    let env_macro = env!("MY_VAR");
    let env_fn = std::env::var("MY_VAR");

    println!("env_macro = {}", env_macro);
    println!("env_fn = {}", env_fn);
}
```

Wenn wir diesen Code kompilieren bekommen wir einen Fehler:

```bash
$ cargo build 
   Compiling env-example v0.1.0 (rust-blog-code/env-example)
error: environment variable `MY_VAR` not defined
 --> src/main.rs:2:21
  |
2 |     let env_macro = env!("MY_VAR");
  |                     ^^^^^^^^^^^^^^
  |
  = note: this error originates in a macro (in Nightly builds, run with -Z macro-backtrace for more info)
```

Es gibt nun zwei Möglichkeiten:

- wir setzen die Environment Variable mit `export MY_VAR=42`
- wir definieren Standardwerte

Zunächst setzen wir die Variable und können den Code dann kompilieren, später in diesem Beitrag schauen wir uns auch Standardwerte an.

```bash
$ export MY_VAR=42
$ cargo build
```

Anschließend können wir das Binary ausführen (hier `env-example` gennant)

```bash
$ ./target/debug/env-example
env_macro = 42
env_fn = 42
```

Beide Werte sind `42`. Jetzt setzen wir die Environment Variable neu:

```bash
export MY_VAR=8
$ ./target/debug/env-example
env_macro = 42
env_fn = 8
```

Aha! `env_macro` hat immer noch den Wert, den die Variable zur Kompilierzeit hatte. 

### Variablen zur Kompilierzeit

`cargo` stellt eine [Handvoll Umgebungsvariablen](https://doc.rust-lang.org/cargo/reference/environment-variables.html#environment-variables-cargo-sets-for-crates) während der Kompilierzeit bereit. Diese Variablen können z.B. benutzt werden um die aktuelle Version aus der `Cargo.toml` Datei auszulesen und in unserem Binary zu hinterlegen. Nehmen wir das `env-example` script und fügen eine neue Zeile hinzu, die die Aktuelle version aus der `Cargo.toml` ausliest.

```rust
fn main() {
    let version = env!("CARGO_PKG_VERSION");
    let env_macro = env!("MY_VAR");
    let env_fn = std::env::var("MY_VAR").unwrap();

    println!("env-example v{}", version);
    println!("env_macro = {}", env_macro);
    println!("env_fn = {}", env_fn);
}
```

{{< note >}}
Wir müssen die neue Variable `CARGO_PKG_VERSION` **nicht selbst setzen**. Cargo setzt diese Variable für uns.
{{< /note >}}

Wir kompilieren nun den Code und führen das Binary aus.

```bash
$ cargo build
$ ./target/debug/env-example
env-example v0.1.0
env_macro = 8
env_fn = 8
```

Der Wert `0.1.0` kommt nun direkt aus der `Cargo.toml` Datei! Wir können auch den Namen unseres Programms `Cargo.toml` auslesen:

```rust
fn main() {
    let version = env!("CARGO_PKG_VERSION");
    let name = env!("CARGO_PKG_NAME");
    let env_macro = env!("MY_VAR");
    let env_fn = std::env::var("MY_VAR").unwrap();

    println!("name: {}", name);
    println!("version: {}", version);
    println!("env_macro = {}", env_macro);
    println!("env_fn = {}", env_fn);
}
```

Kompilieren und ausführen (`-q` unterdrückt die Ausgabe von `cargo build`):

```bash
$ cargo build -q && ./target/debug/env-example
name: env-example
version: 0.1.0
env_macro = 8
env_fn = 8
```

## Standardwerte

`std::env::var()` bieten Möglichkeiten Standardwerte zu setzen.

```rust
fn main() {
    let maybe_fn = std::env::var("MY_VAR").unwrap_or(22);
    println!("maybe_fn = {}", maybe_fn);
} 
```

```bash
$ cargo build -q && ./target/debug/env-example
```

`env!()` bietet diese Möglichkeit nicht, es muss ein Wert gesetzt sein. Wir Können allerdings eine eigene Fehlermeldung als zweiten Parameter angeben.

```rust
fn main() {
    let maybe_macro = env!("MY_VAR", "Bitte MY_VAR setzen, z.B. mit export MY_VAR=21");
    println!("maybe_macro = {}", maybe_macro);
} 
```

{{< note >}}
`cargo run --examples maybe-macro`
{{< /note >}}

Wenn wir den Code ausführen bekommen wir folgenden Fehler:

```bash
$ cargo run --example maybe-macro
   Compiling env-example v0.1.0 (rust-blog-code/env-example)
error: Bitte MY_VAR setzen, z.B. mit export MY_VAR=21
 --> examples/maybe-macro.rs:2:23
  |
2 |     let maybe_macro = env!("MY_VAR", "Bitte MY_VAR setzen, z.B. mit export MY_VAR=21");
  |                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  |
```

{{< note >}}
`cargo run --examples maybe-macro`
{{< /note >}}

## Zusammenfassung

- `cargo` stellt Umgebungsvariablen zur Kompilierzeit bereit
- Umgebungsvariablen können mit dem `env!()` Makro in unseren Code eingebettet werden
- `std::env::var()` liest Variablen zur Ausführungszeit aus
- `env!()` liest Variablen zur Kompilierzeit

## Weiterführende Links

- [Cargo Dokumentation](https://doc.rust-lang.org/cargo/index.html)
- [Cargo GitHub](https://github.com/rust-lang/cargo)
- [std::env Dokumentation](https://doc.rust-lang.org/stable/std/env/index.html)