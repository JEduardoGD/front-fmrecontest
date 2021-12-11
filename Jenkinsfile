def nonprodDeployServer = [:]
    nonprodDeployServer.name = 'NONPROD DEPLOY SERVER'
    nonprodDeployServer.host = "${env.NONPROD_DEPLOY_SERVER}"
    nonprodDeployServer.allowAnyHosts = true

withCredentials([usernamePassword(credentialsId: 'NONPROD_DEPLOY_SERVER_CRED', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
  nonprodDeployServer.user = USERNAME
  nonprodDeployServer.password = PASSWORD
}


def prodDeployServer = [:]
    prodDeployServer.name = 'PROD DEPLOY SERVER'
    prodDeployServer.host = "${env.PROD_DEPLOY_SERVER}"
    prodDeployServer.allowAnyHosts = true

withCredentials([usernamePassword(credentialsId: 'PROD_DEPLOY_SERVER_CRED', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
  prodDeployServer.user = USERNAME
  prodDeployServer.password = PASSWORD
}

pipeline{
  
  agent any
  
	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub-xe1jeg')
    BRANCH_NAME = "${GIT_BRANCH.split("/")[1]}"
    DEPLOY_SERVER="${BRANCH_NAME}_DEPLOY_SERVER"
	}
  
	stages {
		stage('Build') {
			steps {
          script {
            try {
				      sh 'docker build -t xe1jeg/fmrecontest-front-v5:${BRANCH_NAME} .'
              sh 'echo "hello"'
            } catch (e) {
              // If there was an exception thrown, the build failed
              currentBuild.result = "FAILED"
              throw e
            } 
          }
      }
    }
    
		stage('Login') {
        steps {
          notifyBuild('STARTED')
          script {
            try {
              sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
              sh 'echo $DEPLOY_SERVER'
            } catch (e) {
              // If there was an exception thrown, the build failed
              currentBuild.result = "FAILED"
              throw e
            }
          }
        }
		}

		stage('Push') {
			steps {
        script {
          try {
            sh 'docker push xe1jeg/fmrecontest-front-v5:${BRANCH_NAME}'
          } catch (e) {
            // If there was an exception thrown, the build failed
            currentBuild.result = "FAILED"
            throw e
          } 
        }
			}
		}
    
    stage('Remote SSH') {
      steps {
        script {
          if (BRANCH_NAME == 'master') {
            withCredentials([usernamePassword(credentialsId: 'PROD_DEPLOY_SERVER_CRED', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
              sshCommand remote: prodDeployServer, command: "cd ."
              sshCommand remote: prodDeployServer, command: "cd ws/deploy/${BRANCH_NAME} && ./deploy.sh"
           }
          } else {
            withCredentials([usernamePassword(credentialsId: 'NONPROD_DEPLOY_SERVER_CRED', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
              sshCommand remote: nonprodDeployServer, command: "cd ."
              sshCommand remote: nonprodDeployServer, command: "cd ws/deploy/${BRANCH_NAME} && ./deploy.sh"
           }
          }
        }
      }
    }
    
	}
  

	post {
		always {
      script {
        try {
          sh 'docker logout'
        } catch (e) {
          // If there was an exception thrown, the build failed
          currentBuild.result = "FAILED"
          throw e
        } finally {
          // Success or failure, always send notifications
          notifyBuild(currentBuild.result)
        }
      }
    }
  }
}

def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus = buildStatus ?: 'SUCCESS'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESS') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send notifications
  //slackSend (color: colorCode, message: summary)

  //hipchatSend (color: color, notify: true, message: summary)

  def mailRecipients = "eduardo_gd@hotmail.com"
  def jobName = currentBuild.fullDisplayName

    emailext body: '''${SCRIPT, template="groovy-html.template"}''',
        mimeType: 'text/html',
        subject: "[Jenkins] ${subject}",
        to: "${mailRecipients}",
        from: 'xe1jeg@gmail.com',
        replyTo: "${mailRecipients}",
        recipientProviders: [[$class: 'CulpritsRecipientProvider']]
}
