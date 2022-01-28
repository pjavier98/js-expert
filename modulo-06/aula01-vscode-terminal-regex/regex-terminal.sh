# a partir da pasta raiz
# sudo chmod +x regex-terminal.sh

# tras todos os arquivos a partir da pasta raiz terminados em .test.js
# find . -name *.test.js

# tras todos os arquivos a partir da pasta raiz terminados em .test.js menos os arquivos da node_modules
# find . -name *.test.js -not -path '**node_modules**'

# tras todos os arquivos a partir da pasta raiz terminados em .js menos os arquivos da node_modules
# find . -name *.js -not -path '**node_modules**'

# lib para trabalhar com linhas de comando de uma forma mais simples
# npm i -g ipt

# find . -name *.js -not -path '**node_modules**' | ipt

# copiar o desafio do modulo01
# cp -r ../../modulo01/aula05-tdd-project-pt03 .

# 1s => primeira linha
# ^ => primeira coluna
# substitui pelo $CONTENT
# quebrou a linha para adicionar um \n implícito

# find . -name *.js -not -path '**node_modules**' \
# | ipt -o \
# | xargs -I '{file}' sed -i "" -e '1s/^/\"use strict";\n/g' {file}


# substituir tudo
# find . -name *.js -not -path '**node_modules**' \
# | xargs -I '{file}' sed -i "" -e '1s/^/\"use strict";\n/g' {file}