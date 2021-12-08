pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub-xe1jeg')
    BRANCH_NAME = "${GIT_BRANCH.split("/")[1]}"
	}

	stages {
    
		stage('Login') {
      notifyBuild('STARTED')
      try {
        steps {
          sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        }
      } catch (e) {
        // If there was an exception thrown, the build failed
        currentBuild.result = "FAILED"
        throw e
      } finally {
      // Success or failure, always send notifications
      notifyBuild(currentBuild.result)
      }
		}

		stage('Build') {
      try {
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

  emailext (
      subject: subject,
      body: details,
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
