pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub-xe1jeg')
    BRANCH_NAME = "${GIT_BRANCH.split("/")[1]}"
	}

	stages {
    
		stage('Login') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Build') {
			steps {
				sh 'docker build -t xe1jeg/fmrecontest-front-v5:${BRANCH_NAME} .'
			}
		}

		stage('Push') {
			steps {
				sh 'docker push xe1jeg/fmrecontest-front-v5:${BRANCH_NAME}'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}
}
