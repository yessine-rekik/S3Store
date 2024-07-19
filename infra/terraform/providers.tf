provider "aws" {
  region = local.region
}

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.56"
    }

    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.14"
    }

    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.31"
    }

    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
}


data "aws_eks_cluster" "default" {
  name       = local.eks_name
  depends_on = [aws_eks_cluster.eks]
}

data "aws_eks_cluster_auth" "default" {
  name       = local.eks_name
  depends_on = [aws_eks_cluster.eks]
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.default.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.default.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.default.token
  }
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.default.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.default.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.default.token
}
