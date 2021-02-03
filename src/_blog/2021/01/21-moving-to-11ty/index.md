---
title: "Moving to 11ty"
subtitle: "Recap of my experience moving from Hugo to Eleventy"
type: blog
categories:
    - coding
tags:
    - javascript
    - node
    - ssg
    - blog
date: "2021-01-24"
lastmod: "2021-01-24"
head: null
foot: null
svg_title: |
    <svg viewBox="0 0 1024 300" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
    <g fill-opacity=".5" fill-rule="nonzero">
      <path d="M35.926 110.385v-1.584c-1.152 0-2.4-.096-3.744-.288a15.332 15.332 0 01-3.744-1.008c-1.152-.48-2.112-1.104-2.88-1.872-.768-.768-1.152-1.776-1.152-3.024V50.193c0-1.152.36-2.112 1.08-2.88.72-.768 1.656-1.416 2.808-1.944s2.4-.912 3.744-1.152c1.344-.24 2.64-.36 3.888-.36v-1.584H.934v1.584c1.344 0 2.688.12 4.032.36 1.344.24 2.568.6 3.672 1.08 1.104.48 2.016 1.104 2.736 1.872.72.768 1.08 1.728 1.08 2.88v52.416a4.292 4.292 0 01-1.008 2.808 7.252 7.252 0 01-2.52 1.944c-1.008.48-2.16.864-3.456 1.152a18.2 18.2 0 01-3.96.432v1.584h34.416zM81.43 110.385v-1.584c-1.152 0-2.4-.096-3.744-.288a15.332 15.332 0 01-3.744-1.008c-1.152-.48-2.112-1.104-2.88-1.872-.768-.768-1.152-1.776-1.152-3.024V50.193c0-1.152.36-2.112 1.08-2.88.72-.768 1.656-1.416 2.808-1.944s2.4-.912 3.744-1.152c1.344-.24 2.64-.36 3.888-.36v-1.584H46.438v1.584c1.344 0 2.688.12 4.032.36 1.344.24 2.568.6 3.672 1.08 1.104.48 2.016 1.104 2.736 1.872.72.768 1.08 1.728 1.08 2.88v52.416a4.292 4.292 0 01-1.008 2.808 7.252 7.252 0 01-2.52 1.944c-1.008.48-2.16.864-3.456 1.152a18.2 18.2 0 01-3.96.432v1.584H81.43zM135.97 110.456h-13.992l-13.922-.071c-3.282 0-5.578-.211-6.891-.633-2.391-.843-3.586-2.625-3.586-5.343 0-4.735 3.68-7.102 11.039-7.102l3.375.07 2.883.141c0-2.25-.199-5.578-.598-9.984-.398-4.407-.597-7.711-.597-9.914 0-5.953.539-15 1.617-27.141 1.031-11.953 1.523-21.023 1.476-27.211-6.281 4.875-10.289 7.313-12.023 7.313-1.875 0-3.504-.704-4.887-2.11-1.383-1.406-2.074-3.023-2.074-4.851 0-2.203 2.016-4.875 6.047-8.016 2.531-1.781 6.117-4.641 10.758-8.578 4.125-4.172 8.062-6.258 11.812-6.258 3.141 0 4.711 1.805 4.711 5.414 0 1.078-.14 2.684-.422 4.817-.281 2.132-.422 3.738-.422 4.816 0 1.547.082 3.891.247 7.031.164 3.141.246 5.485.246 7.031 0 5.344-.563 13.313-1.688 23.907-1.125 10.593-1.687 18.539-1.687 23.836 0 2.718.187 6.023.562 9.914.375 3.89.586 7.078.633 9.562l7.383-.14c1.969 0 3.597.644 4.886 1.933 1.29 1.289 1.934 2.895 1.934 4.817 0 1.968-.644 3.586-1.934 4.851-1.289 1.266-2.917 1.899-4.886 1.899zM200.798 110.456h-13.992l-13.922-.071c-3.281 0-5.578-.211-6.891-.633-2.39-.843-3.586-2.625-3.586-5.343 0-4.735 3.68-7.102 11.039-7.102l3.375.07 2.883.141c0-2.25-.199-5.578-.598-9.984-.398-4.407-.597-7.711-.597-9.914 0-5.953.539-15 1.617-27.141 1.031-11.953 1.523-21.023 1.477-27.211-6.282 4.875-10.289 7.313-12.024 7.313-1.875 0-3.504-.704-4.887-2.11-1.382-1.406-2.074-3.023-2.074-4.851 0-2.203 2.016-4.875 6.047-8.016 2.531-1.781 6.117-4.641 10.758-8.578 4.125-4.172 8.062-6.258 11.812-6.258 3.141 0 4.711 1.805 4.711 5.414 0 1.078-.14 2.684-.422 4.817-.281 2.132-.421 3.738-.421 4.816 0 1.547.082 3.891.246 7.031.164 3.141.246 5.485.246 7.031 0 5.344-.563 13.313-1.688 23.907-1.125 10.593-1.687 18.539-1.687 23.836 0 2.718.187 6.023.562 9.914.375 3.89.586 7.078.633 9.562l7.383-.14c1.969 0 3.598.644 4.887 1.933 1.289 1.289 1.933 2.895 1.933 4.817 0 1.968-.644 3.586-1.933 4.851-1.289 1.266-2.918 1.899-4.887 1.899zM278.19 103.185l-.144-99.504-54.72 27.504v8.784l17.28-8.352v71.568h-17.28v7.2h72.144v-7.2h-17.28zM364.734 103.185l-.144-99.504-54.72 27.504v8.784l17.28-8.352v71.568h-17.28v7.2h72.144v-7.2h-17.28zM422.19 108.657c.96 0 1.8-.264 2.52-.792s1.08-1.608 1.08-3.24V56.529c-.672 0-1.464.048-2.376.144-.912.096-1.8.264-2.664.504a9.571 9.571 0 00-2.376 1.008 3.47 3.47 0 00-1.512 1.8h-1.728V41.841h1.728c0 .864.432 1.464 1.296 1.8.864.336 1.68.504 2.448.504 1.632 0 3-.504 4.104-1.512s1.656-2.232 1.656-3.672c0-1.344-.312-2.208-.936-2.592-.624-.384-1.464-.672-2.52-.864v-1.728h23.328v1.728c-1.152.192-2.112.528-2.88 1.008-.768.48-1.152 1.2-1.152 2.16v65.952c0 1.632.384 2.712 1.152 3.24a4.47 4.47 0 002.592.792v1.728h-23.76v-1.728zM510.174 108.657c.96 0 1.8-.264 2.52-.792s1.08-1.608 1.08-3.24V56.529c-.672 0-1.464.048-2.376.144-.912.096-1.8.264-2.664.504a9.571 9.571 0 00-2.376 1.008 3.47 3.47 0 00-1.512 1.8h-1.728V41.841h1.728c0 .864.432 1.464 1.296 1.8.864.336 1.68.504 2.448.504 1.632 0 3-.504 4.104-1.512s1.656-2.232 1.656-3.672c0-1.344-.312-2.208-.936-2.592-.624-.384-1.464-.672-2.52-.864v-1.728h23.328v1.728c-1.152.192-2.112.528-2.88 1.008-.768.48-1.152 1.2-1.152 2.16v65.952c0 1.632.384 2.712 1.152 3.24a4.47 4.47 0 002.592.792v1.728h-23.76v-1.728zM587.502 110.385V23.409l-14.688 10.8V18.657l14.688-10.8h14.688v102.528h-14.688zM641.07 110.385V23.409l-14.688 10.8V18.657l14.688-10.8h14.688v102.528H641.07zM718.443 20.948v83.531h20.25c1.406 0 2.414.27 3.023.809.61.539.915 1.254.915 2.144 0 .844-.305 1.547-.915 2.11-.609.562-1.617.843-3.023.843h-46.406c-1.406 0-2.414-.281-3.024-.843-.609-.563-.914-1.266-.914-2.11 0-.89.305-1.605.914-2.144.61-.539 1.618-.809 3.024-.809h20.25V29.104l-19.266 6.047c-.937.281-1.617.422-2.039.422-.703 0-1.348-.293-1.934-.879-.585-.586-.878-1.277-.878-2.074 0-.703.234-1.36.703-1.969.375-.375 1.148-.774 2.32-1.195l27-8.508zM804.857 20.948v83.531h20.25c1.406 0 2.414.27 3.024.809.609.539.914 1.254.914 2.144 0 .844-.305 1.547-.914 2.11-.61.562-1.618.843-3.024.843h-46.406c-1.406 0-2.414-.281-3.024-.843-.609-.563-.914-1.266-.914-2.11 0-.89.305-1.605.914-2.144.61-.539 1.618-.809 3.024-.809h20.25V29.104l-19.266 6.047c-.937.281-1.617.422-2.039.422-.703 0-1.348-.293-1.933-.879-.586-.586-.879-1.277-.879-2.074 0-.703.234-1.36.703-1.969.375-.375 1.148-.774 2.32-1.195l27-8.508zM853.091 110.385v-8.648h31.219v-83.11l-31.219 12.446v-9.281l45.141-18.071v98.016h31.219v8.648h-76.36zM939.506 110.385v-8.648h31.218v-83.11l-31.218 12.446v-9.281l45.14-18.071v98.016h31.219v8.648h-76.359zM17.118 283.213v-10.406h20.813v-82.125l-20.813 5.203v-10.687l34.734-8.649v96.258h20.813v10.406H17.118zM108.173 283.213v-10.406h20.812v-82.125l-20.812 5.203v-10.687l34.734-8.649v96.258h20.813v10.406h-55.547zM246.547 283.213h-47.664v-9.216h16.416v-81.216l-16.992 8.928-3.888-7.056 20.88-12.24h15.12v91.584h16.128v9.216zM332.947 283.213h-47.664v-9.216h16.416v-81.216l-16.992 8.928-3.888-7.056 20.88-12.24h15.12v91.584h16.128v9.216zM415.621 270.276v12.937h-42.82v-12.937h14.555v-80.227h-14.555v-12.656h29.109v92.883h13.711zM500.137 270.276v12.937h-42.821v-12.937h14.555v-80.227h-14.555v-12.656h29.11v92.883h13.711zM558.138 271.981v-84.24h-1.728l-16.56 37.872h-11.952v-.864l18.864-42.336h23.472v89.568h28.512v11.232h-69.12v-11.232h28.512zM646.266 271.981v-84.24h-1.728l-16.56 37.872h-11.952v-.864l18.864-42.336h23.472v89.568h28.512v11.232h-69.12v-11.232h28.512zM735.567 272.311v-84.206c-3.931 3.108-7.749 5.771-11.451 7.988-3.703 2.218-8.778 4.469-15.223 6.755v-11.795c10.24-4.388 19.131-10.034 26.674-16.937h13.097v98.195h26.263v10.902h-66.034v-10.902h26.674zM821.967 272.311v-84.206c-3.931 3.108-7.749 5.771-11.451 7.988-3.703 2.218-8.778 4.469-15.223 6.755v-11.795c10.24-4.388 19.131-10.034 26.674-16.937h13.097v98.195h26.263v10.902h-66.034v-10.902h26.674zM890.607 208.893c-1.828 22.453-2.742 41.508-2.742 57.164 0 4.36.07 8.32.211 11.883.14 3.516-1.079 5.273-3.657 5.273-2.859 0-4.289-1.711-4.289-5.132 0-19.922.516-39.914 1.547-59.977-1.078.094-1.851-.387-2.32-1.441-.469-1.055-.586-2.426-.352-4.114.891-6.093 3.211-9.14 6.961-9.14 3.375 0 4.922 1.828 4.641 5.484zM923.302 208.893c-1.828 22.453-2.742 41.508-2.742 57.164 0 4.36.07 8.32.211 11.883.141 3.516-1.078 5.273-3.656 5.273-2.86 0-4.289-1.711-4.289-5.132 0-19.922.515-39.914 1.546-59.977-1.078.094-1.851-.387-2.32-1.441-.469-1.055-.586-2.426-.351-4.114.89-6.093 3.211-9.14 6.961-9.14 3.375 0 4.921 1.828 4.64 5.484zM988.857 282.349c-1.248 2.88-4.416 4.32-9.504 4.32-4.8 0-9.168-1.152-13.104-3.456-4.32-2.592-6.192-5.664-5.616-9.216.288-1.44 1.344-3.096 3.168-4.968 1.824-1.872 2.688-3.48 2.592-4.824l-2.592-63.936c-.096-2.208-2.256-4.416-6.48-6.624-4.224-2.208-6.384-4.896-6.48-8.064 2.88-6.048 6.192-10.848 9.936-14.4 3.456-3.36 6.672-5.184 9.648-5.472 4.032-.384 7.68.72 10.944 3.312 3.264 2.592 4.8 5.808 4.608 9.648 0 1.056-.528 2.328-1.584 3.816s-1.584 2.808-1.584 3.96l2.304 76.032c.096 2.112.96 4.488 2.592 7.128 1.632 2.64 2.448 4.92 2.448 6.84 0 1.728-.432 3.696-1.296 5.904z"/>
    </g>
    <path fill-opacity=".5" d="M197 100h630v100H197z"/>
    <g fill="#fff" fill-rule="nonzero">
      <path d="M251.972 171.096h-10.368l-.576-21.384a100.555 100.555 0 01-.072-4.32c0-2.4.072-4.74.216-7.02.144-2.28.312-4.668.504-7.164L236.06 162.6h-8.928l-6.12-31.392c.528 5.52.792 10.488.792 14.904l-.072 3.816-.36 21.168H211.22l2.808-49.896h12.168l5.544 32.256 5.256-32.256h12.168l2.808 49.896zM274.796 131.568c5.808 0 10.356 1.836 13.644 5.508 3.288 3.672 4.932 8.604 4.932 14.796 0 6.432-1.632 11.448-4.896 15.048-3.264 3.6-7.824 5.4-13.68 5.4s-10.416-1.788-13.68-5.364c-3.264-3.576-4.896-8.58-4.896-15.012 0-4.08.732-7.644 2.196-10.692 1.464-3.048 3.6-5.424 6.408-7.128 2.808-1.704 6.132-2.556 9.972-2.556zm0 8.424c-2.352 0-4.08.948-5.184 2.844s-1.656 4.932-1.656 9.108c0 4.224.552 7.284 1.656 9.18 1.104 1.896 2.832 2.844 5.184 2.844 2.352 0 4.08-.96 5.184-2.88s1.656-4.992 1.656-9.216c0-4.128-.552-7.14-1.656-9.036-1.104-1.896-2.832-2.844-5.184-2.844zM337.508 132.864l-12.744 38.232h-13.392l-12.888-38.232h12.312l7.416 29.52 7.776-29.52h11.52zM361.124 112.848c1.968 0 3.576.612 4.824 1.836 1.248 1.224 1.872 2.748 1.872 4.572 0 1.872-.624 3.408-1.872 4.608-1.248 1.2-2.856 1.8-4.824 1.8s-3.588-.612-4.86-1.836c-1.272-1.224-1.908-2.748-1.908-4.572 0-1.824.636-3.348 1.908-4.572 1.272-1.224 2.892-1.836 4.86-1.836zm6.84 20.016v30.456h9.792v7.776h-31.968v-7.776h10.8v-22.68h-10.44v-7.776h21.816zM387.836 132.864h9.936l.792 4.392c1.728-1.92 3.54-3.348 5.436-4.284 1.896-.936 4.044-1.404 6.444-1.404 3.312 0 5.892 1.008 7.74 3.024 1.848 2.016 2.772 4.824 2.772 8.424v28.08H409.58v-24.768c0-2.4-.264-4.056-.792-4.968-.528-.912-1.488-1.368-2.88-1.368-1.152 0-2.268.372-3.348 1.116-1.08.744-2.196 1.836-3.348 3.276v26.712h-11.376v-38.232zM467.612 135.096c-2.496 1.008-6.168 1.512-11.016 1.512 2.496 1.104 4.356 2.424 5.58 3.96 1.224 1.536 1.836 3.504 1.836 5.904 0 2.448-.672 4.644-2.016 6.588-1.344 1.944-3.24 3.468-5.688 4.572-2.448 1.104-5.28 1.656-8.496 1.656-1.584 0-3.072-.144-4.464-.432a2.039 2.039 0 00-.9.9 2.662 2.662 0 00-.324 1.26c0 .72.276 1.284.828 1.692.552.408 1.668.612 3.348.612h6.336c2.88 0 5.424.48 7.632 1.44 2.208.96 3.912 2.28 5.112 3.96 1.2 1.68 1.8 3.576 1.8 5.688 0 3.984-1.74 7.092-5.22 9.324-3.48 2.232-8.556 3.348-15.228 3.348-4.752 0-8.484-.492-11.196-1.476-2.712-.984-4.608-2.364-5.688-4.14-1.08-1.776-1.62-4.008-1.62-6.696h10.08c0 1.2.228 2.136.684 2.808.456.672 1.308 1.176 2.556 1.512 1.248.336 3.072.504 5.472.504 3.36 0 5.676-.384 6.948-1.152 1.272-.768 1.908-1.848 1.908-3.24 0-1.152-.468-2.076-1.404-2.772-.936-.696-2.316-1.044-4.14-1.044h-6.048c-3.936 0-6.888-.708-8.856-2.124-1.968-1.416-2.952-3.228-2.952-5.436 0-1.44.372-2.796 1.116-4.068.744-1.272 1.788-2.34 3.132-3.204-2.4-1.296-4.128-2.82-5.184-4.572-1.056-1.752-1.584-3.876-1.584-6.372 0-2.832.72-5.304 2.16-7.416 1.44-2.112 3.456-3.732 6.048-4.86 2.592-1.128 5.544-1.692 8.856-1.692 3.84.096 7.104-.276 9.792-1.116 2.688-.84 5.424-2.1 8.208-3.78l2.592 8.352zm-20.304 3.96c-1.824 0-3.252.576-4.284 1.728-1.032 1.152-1.548 2.712-1.548 4.68 0 2.064.528 3.672 1.584 4.824 1.056 1.152 2.472 1.728 4.248 1.728 1.872 0 3.312-.564 4.32-1.692 1.008-1.128 1.512-2.796 1.512-5.004 0-4.176-1.944-6.264-5.832-6.264zM551.852 168.864c-3.6 2.304-7.776 3.456-12.528 3.456-4.896 0-8.58-1.248-11.052-3.744-2.472-2.496-3.708-6-3.708-10.512v-17.352h-7.992v-7.848h7.992v-8.28l11.376-1.368v9.648h12.312l-1.152 7.848h-11.16v17.352c0 1.872.432 3.216 1.296 4.032.864.816 2.256 1.224 4.176 1.224 2.4 0 4.632-.576 6.696-1.728l3.744 7.272zM577.196 131.568c5.808 0 10.356 1.836 13.644 5.508 3.288 3.672 4.932 8.604 4.932 14.796 0 6.432-1.632 11.448-4.896 15.048-3.264 3.6-7.824 5.4-13.68 5.4s-10.416-1.788-13.68-5.364c-3.264-3.576-4.896-8.58-4.896-15.012 0-4.08.732-7.644 2.196-10.692 1.464-3.048 3.6-5.424 6.408-7.128 2.808-1.704 6.132-2.556 9.972-2.556zm0 8.424c-2.352 0-4.08.948-5.184 2.844s-1.656 4.932-1.656 9.108c0 4.224.552 7.284 1.656 9.18 1.104 1.896 2.832 2.844 5.184 2.844 2.352 0 4.08-.96 5.184-2.88s1.656-4.992 1.656-9.216c0-4.128-.552-7.14-1.656-9.036-1.104-1.896-2.832-2.844-5.184-2.844zM672.38 162.456h9.288v8.64h-32.4v-8.64h12.024V132.36l-10.296 6.48-4.824-7.848L662.3 121.2h10.08v41.256zM715.58 162.456h9.288v8.64h-32.4v-8.64h12.024V132.36l-10.296 6.48-4.824-7.848L705.5 121.2h10.08v41.256zM767.852 168.864c-3.6 2.304-7.776 3.456-12.528 3.456-4.896 0-8.58-1.248-11.052-3.744-2.472-2.496-3.708-6-3.708-10.512v-17.352h-7.992v-7.848h7.992v-8.28l11.376-1.368v9.648h12.312l-1.152 7.848h-11.16v17.352c0 1.872.432 3.216 1.296 4.032.864.816 2.256 1.224 4.176 1.224 2.4 0 4.632-.576 6.696-1.728l3.744 7.272zM800.036 171.096c-1.728 5.136-4.296 9.012-7.704 11.628-3.408 2.616-7.968 4.092-13.68 4.428l-1.296-8.064c3.648-.48 6.348-1.296 8.1-2.448 1.752-1.152 3.156-3 4.212-5.544h-3.96l-12.096-38.232h12.024l7.416 30.96 8.064-30.96h11.664l-12.744 38.232z"/>
    </g>
    </svg>
---

In this article I want to discuss my reasons for moving my personal website and blog (the very site you're reading right now!) from [Hugo](https://gohugo.io) to [11ty](https://www.11ty.dev/), a static-site generator written in JavaScript. I'll also highlight some adjustments and configs I needed to make in order to get 11ty working with my existing articles that I've used with Hugo, and before that Jekyll, and most importantly, how I ported a ton of custom shortcodes! I will write this article as I move along with the transformation as to capture my experience and thoughts immediately. 

## Why move?

_"Why move?"_ is a valid question because there's nothing in particular wrong with Hugo - it's a great static site generator. I've started working on a redesign and figured out that it takes a huge amount of time to redesign my relatively small blog. I also found that I've also felt a lack of flexibility when it came to hugo and in the last days of creating a new theme the reloading / recompile pipeline was acting up so that I could no longer get the latest versions of CSS or JS in the browser and needed to constantly restart the dev server.

Another reason for moving and especially a reason for choosing 11ty is the way it can be extended! Adding a new shortcode looks like this:

```js
// file: .eleventy.js
module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("hello", (name) => `Hello, ${name}`);
} 
```

Now in my markdown files I can write `{% raw %} {% hello "reader!" %}{% endraw %}` and it will print `hello, reader!`. And since it's all JavaScript any sort of script or library can be included! If I have a JavaScript library that encrypts a string I could define a filter or shortcode like this:

```js
// file: .eleventy.js
const myCryptLib = require('my-crypt-lib');

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("encrypt", (str) => {
    return myCryptLib.encrypt(str);
  });
} 
```

and now again, the shortcode can be used immediately: 
```liquid
{% raw %}{% encrypt "super secret string" %}{% endraw %}
```

@TODO: Write about https://github.com/11ty/eleventy/issues/1526#issuecomment-731855231

This is a level of deep integration I simply cannot get from Hugo, and I'm very excited about this feature!

## Defining collections

By default eleventy compiles every markdown file into a page, so for example the README.md file would be compiled into a file at `_site/README/index.html`. This is not what I wanted so I looked through the docs and it turns our there's a special file called `.eleventyignore` that can be used to list files that eleventy will ignore - just like a `.gitignore` file for git. By default, eleventy ignores `node_modules`.

## URLs and permalinks

For me the most important thing when moving to any new {% abbr "static site generator" "a tool that creates a HTML website from content and config files" %} is the ability to configure permalinks. I do not want to break all old links and I do not want to create some rewrite or redirect magic. I want to continue using permalinks as I've been doing with Hugo.

I wasn't able to find a solution in the docs, but found the solution in [an article on moving to 11ty by Kitty](https://hugogiraudel.com/2020/11/30/from-jekyll-to-11ty/#posts-permalinks). They also struggled with the permalink structure and then found out that creating a JSON file named after the collection with configs for permalink and layout is the solution.

So I placed a `_blog.json` file in my `_blog` directory (because the collection in eleventy is also called `blog`).

```js
{
  "layout": "blog",
  "permalink": "/blog/{{ page.date | date: '%Y/%m' }}/{{ title | slug }}/"
}
```

In here we can use the filters provided by 11ty like `date` to format the date and `slug` to turn the post title into a URL. `slug` will replace some characters in the `title`, for example spaces with dashes (`-`). 

## Static assets

Next up is static assets. The first that comes to my mind is CSS and JS files.

@TODO: Finish this section!

## Plugins

### eleventy-plugin-syntaxhighlight

I'm using the `@11ty/eleventy-plugin-syntaxhighlight` plugin to add syntax highlighting. The plugin works at build time so no additional JavaScript is required. The plugin is added into the `.eleventy.js` config file like so

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
};
```

Afterwards I added the Base16-Tomorrow-Night Theme from [https://atelierbram.github.io/syntax-highlighting/prism/](https://atelierbram.github.io/syntax-highlighting/prism/)

And that's all that was needed to get syntax highlighting going! Here's some examples:

```rust
// Rust code
fn main() {
  println!("Hello, {}!", "Rust");
}
```

```go
// Go code
func main() {
  fmt.Println("Hello, go!")
}
```

```javascript
// JavaScript
function main() {
  console.log("Hello, JavaScript!");
}
```

Prism also allows me to highlight a certain line of code!

```rust/4-13
fn main() {
    let opts = Cli::from_args();
    let res = mktoc::make_toc(opts.file, opts.min_depth, opts.max_depth);

    match res {
        Ok(new_toc) => {
            handle_write(new_toc);
            std::process::exit(0);
        }
        Err(e) => {
            eprintln!("Error: {}", e);
            std::process::exit(1);
        }
    };
}
```

I'm still experimenting with the syntax highlighting and am not yet satisfied with it.

### @11tyrocks/eleventy-plugin-emoji-readtime

The next plugin I'm using is [@11tyrocks/eleventy-plugin-emoji-readtime](https://www.npmjs.com/package/@11tyrocks/eleventy-plugin-emoji-readtime) which provides a filter for outputting estimated read times. That's it, it does this quite well and with a emoji which I like!

### @11ty/eleventy-img

[@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/) is an official 11ty plugin that can do all sorts of magic things with images!

## My own plugins

While converting some shortcodes and implementing new once, I decided to program them as plugins so they can be shared with everyone! So far I've build the following:

- CodePen Embed: [@kevingimbel/eleventy-plugin-codepen](https://www.npmjs.com/package/@kevingimbel/eleventy-plugin-codepen)
- CanIUse.com Embed: [@kevingimbel/eleventy-plugin-caniuse](https://www.npmjs.com/package/@kevingimbel/eleventy-plugin-caniuse)
- Emoji Rating: [@kevingimbel/eleventy-plugin-emoji-rating](https://www.npmjs.com/package/@kevingimbel/eleventy-plugin-emoji-rating)

All three provide shortcodes which look like this:

**@kevingimbel/eleventy-plugin-codepen**

{% codepen "https://codepen.io/kevingimbel/pen/iqDIv" "Pure CSS, single-div Link from The Legend Of Zelda" "height:500" %}

**@kevingimbel/eleventy-plugin-caniuse**

{% caniuse "css-variables" %}

**@kevingimbel/eleventy-plugin-emoji-rating**

{% rating "3" "🍐" %}

Emojis are configureable both inline and in the `.eleventy.js` config file.
```
{% raw %}{% rating "5" "🍅" %}{% endraw %}
```
{% rating "5" "🍅" %}


The max rating is configurable as well!
```
{% raw %}{% rating "5" 🤔" "" "7" %}{% endraw %}
```
{% rating "5" "🤔" "" "7" %}

As third argument an inactive emoji can be specified.
```
{% raw %}{% rating "5" "😍" "😵" "7" %}{% endraw %}
```
{% rating "5" "😍" "😵" "7" %}

## Helpful links

These resources helped me get started with 11ty, and in planning my new website design.

- [List blog posts by year](https://github.com/11ty/eleventy/issues/1284#issuecomment-648749730) from GitHub Issues
- [Eleventy Plugin Template](https://github.com/5t3ph/eleventy-plugin-template) by [Stephanie Eckles](https://github.com/5t3ph)
- [Art Direction for static sites](https://daverupert.com/2021/01/art-direction-for-static-sites/) by [Dave Rupert](https://twitter.com/davatron5000)
- [Create your first 11ty website](https://11ty.rocks/posts/create-your-first-basic-11ty-website/) from [11ty.rocks](11ty.rocks)