
# S3Store
This repository showcases an application and infrastructure setup designed to enhance skills across various technologies. It covers the deployment and management of AWS resources, Kubernetes clusters, CI/CD pipelines, monitoring, and more.

For any issues, questions or feedback, please contact me at: rrekikyessine@gmail.com .

## Cloud Storage Application with AWS S3

### Overview
This cloud storage application utilizes AWS S3 for secure and scalable user file storage and retrieval. It provides a robust solution for managing files in a cloud-native environment.

### Implementation Details
- **Backend**: Implemented using Node.js and TypeScript  to handle file upload, download, and management operations as well as authentication and authorization.
- **AWS S3 Integration**: Utilizes AWS SDK for JavaScript to interact with S3, ensuring secure storage and retrieval of user files.


### Running the Application
Ensure Node.js runtime (version 20) and MongoDB are installed. Alternatively you can setup your own. `docker-compose.yml` based on the `Dockerfile`s provided in each service.

Navigate to the following directories: `auth-service`, `storage-service`, `api-gateway` `client` , and apply these steps in each one of them.
1. **Environment Variables Setup**:
   - Configure `.env` files as per `.env.example`.
   -  Make sure you provided your own AWS Credentials and S3 Bucket details in the `.env` file of the `storage-service`.
2. **Development Environment**:
   - Run `npm install` to install dependencies.
   - Start the development server with `npm run dev`. 

3. **Production Ready Environment**:
   - Build the application with `npm run build`.
   - Start the production server with `npm run start`.

**Note:** The `api-gateway` service is used only during development for convenience. In production, routing and ingress handling will be managed by `ingress-nginx` Kubernetes ingress controller.

## CI Pipelines with GitHub Actions

### Overview
GitHub Actions automates CI/CD workflows for linting, testing, and building applications, ensuring code quality and deployment readiness before production releases.

### Workflow Steps
- GitHub Actions will handle linting, testing, and building processes on pull request events to ensure code quality.
- On merge to the `dev`, `staging` or `master`  branches, GitHub Actions will push the corresponding Docker image to AWS ECR.
 - ArgoCD will then take over, monitoring the Docker image changes in ECR and automatically deploying the updated application to the Kubernetes cluster.

## Kubernetes Cluster on AWS EKS

### Overview
The Kubernetes cluster is deployed on AWS EKS to leverage its scalability, reliability, and managed Kubernetes environment capabilities.

### Implementation Details
  - **Infrastructure Provisioning**: Managed using Terraform to provision necessary Helm Charts  and AWS resources.

### Deployment Steps
1. **Terraform Setup**:
   - Ensure AWS credentials are configured locally or in your environment variables. You can set these up using the AWS CLI or by configuring your preferred method of authentication (IAM user, IAM role, etc.).
   - Navigate to `infra/terraform`.
   - Initialize Terraform with `terraform init`.
   - Apply Terraform configuration with `terraform apply`

**Note**: AWS will charge for the following resources created by this setup: 
- 1 EKS.
- 1 to 3 `t3.medium` EC2 instances for the worker nodes.
- 2 NAT Gateways.
- 2 Elastic IP addresses (EIP).
- 1 AWS S3 bucket.
- ECR.

You can destroy everything with `terraform destory`.


2. **Deploying Applications**:
   - Navigate to `infra/k8s`.
   - Use `kubectl apply -f manifests` to deploy Kubernetes manifests.
   
This initial deployment will automatically set up an App-of-Apps pattern in ArgoCD. This pattern streamlines future deployments by managing all applications as code within your Git repository. ArgoCD will continuously monitor your Git repository for changes and automatically apply updates to your Kubernetes cluster, ensuring consistent and automated application deployments without the need for further `kubectl` commands.

## Contact
For any issues, questions or feedback, please contact me at: rrekikyessine@gmail.com .

