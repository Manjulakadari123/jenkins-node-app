pipeline {

    agent any

    environment {
        APP_NAME = "jenkins-node-app"
        DOCKER_IMAGE = "manjulakadari/jenkins-node-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                sh 'npm test'
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging application...'
                sh 'npm run package'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'

                sh '''
                    docker build \
                    -t ${DOCKER_IMAGE}:${IMAGE_TAG} \
                    -t ${DOCKER_IMAGE}:latest .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'manjulakadari',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                        -u "$DOCKER_USERNAME" \
                        --password-stdin

                        docker push ${DOCKER_IMAGE}:${IMAGE_TAG}
                        docker push ${DOCKER_IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}
