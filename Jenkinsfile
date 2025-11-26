pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Hamza-delux/devops-uptime-monitor.git']])
            }
        }

        stage('Backend') {
            steps {
                dir('backend') {sh '''echo "Installing backend dependencies..."
                npm install
                '''}
            }
        }

        stage('Frontend') {
            steps {
                dir('frontend/uptime-monitor-frontend') {
                    sh '''echo "Installing frontend deps..."
                    npm install

                    echo "Building Angular app..."
                    npm run build
                    '''
}
            }
        }
    }
}
