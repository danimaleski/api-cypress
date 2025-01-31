pipeline {
   agent any


   stages {
       stage('Repositório') {
         steps {
           git branch: 'main', url: 'http://github.com/danimaleski/api-cypress.git'
         }
       }
       stage('Instalar dependências') {
         steps {
           sh 'npm install'
         }
       }
       stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
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
