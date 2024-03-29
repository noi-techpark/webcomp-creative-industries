pipeline {
    agent {
        dockerfile {
            filename 'infrastructure/docker/node.dockerfile'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=$(id -u jenkins) --build-arg JENKINS_GROUP_ID=$(id -g jenkins)'
        }
    }
    options {
        ansiColor('xterm')
    }
    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Version (without a leading "v")', trim: true)
    }
    environment {
        WC_GIT_REMOTE = get_git_remote()
        WC_GIT_BRANCH = get_git_branch()
        WC_DIST_PATH = "dist"
    }
    stages {
        stage('Clean') {
            steps {
                sh '''
                  rm -rf dist
                '''
            }
        }
        stage('Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Git Tag') {
            steps {
                sshagent (credentials: ['jenkins_github_ssh_key']) {
                    sh """
                        mkdir -p ~/.ssh
                        ssh-keyscan -H github.com >> ~/.ssh/known_hosts
                        git config --global user.email "info@opendatahub.com"
                        git config --global user.name "Jenkins"
                        git remote set-url ${WC_GIT_REMOTE} ${GIT_URL}
                        git add ${WC_DIST_PATH}/*
                        git add -A
                        git commit --allow-empty -m "Version ${VERSION}"
                        git tag --delete v${VERSION} || true
                        git push ${WC_GIT_REMOTE} :v${VERSION} || true
                        git tag -a v${VERSION} -m "Version ${VERSION}"
                        git push ${WC_GIT_REMOTE} HEAD:${WC_GIT_BRANCH}
                        git push ${WC_GIT_REMOTE} v${VERSION}
                    """
                }
            }
        }
    }
}

// Helper functions
def get_git_remote() {
    return env.GIT_BRANCH.split('/')[0]
}

def get_git_branch() {
    return env.GIT_BRANCH.split('/')[1]
}
