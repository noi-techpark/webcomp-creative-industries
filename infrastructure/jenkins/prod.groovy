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
                ansiColor('xterm') {
                    sshagent (credentials: ['jenkins_github_ssh_key']) {
                        sh """
                          git config --global user.email "info@opendatahub.bz.it"
                          git config --global user.name "Jenkins"
                          git remote set-url origin ${GIT_REPOSITORY}
                          git add -A
                          git commit --allow-empty -m "Version ${VERSION}"
                          git tag --delete v${VERSION} || true
                          git tag -a v${VERSION} -m "Version ${VERSION}"
                          mkdir -p ~/.ssh
                          ssh-keyscan -H github.com >> ~/.ssh/known_hosts
                          git push origin HEAD:master
                          git push origin --tags
                        """
                    }
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
