pipeline {
   agent any


   stages {
       stage('Repositório') {
         steps {
           git branch: 'main', url: 'https://github.com/danimaleski/api-cypress.git'
         }
       }
       node{
        def nodejs = tool name: 'NodeJS', type:'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        env.PATH="${noddejs}/bin:bin:${env.PATH}"
        stage('Instalar dependências') {
         steps {
           sh 'npm install'
         }
        }
       }
       stage('Subir servidor'){
        steps {
          sh 'start /b npm start'
        }
       }
       stage('Executar Testes') {
         steps {
           sh 'NO_COLOR=1 npm run cy:run-ci | true'
         }
       }
   }
}
