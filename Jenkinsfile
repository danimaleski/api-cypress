pipeline {
   agent any


   stages {
       stage('Repositório') {
         steps {
           git branch: 'main', url: 'https://github.com/danimaleski/api-cypress.git'
         }
       }
       stage('Instalar dependências') {
         steps {
           sh 'npm install'
         }
       }
       stage('Subir servidor'){
        steps {
          sh 'npx serverest'
        }
       }
       stage('Executar Testes') {
         steps {
           sh 'NO_COLOR=1 npm test'
         }
       }
   }
}
