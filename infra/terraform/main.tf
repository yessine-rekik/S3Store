provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "prod" {
  metadata {
    name = "prod"
  }
}

resource "kubernetes_namespace" "staging" {
  metadata {
    name = "staging"
  }
}

resource "kubernetes_namespace" "dev" {
  metadata {
    name = "dev"
  }
}

resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
  }
}

resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
  }
}


provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

resource "helm_release" "ingress-nginx" {
  name             = "ingress-nginx"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  namespace        = "ingress-nginx"
  version          = "4.10.1"
  create_namespace = true
  wait             = false
}

resource "helm_release" "kube-prometheus-stack" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = "monitoring"
  version    = "60.2.0"
}

resource "helm_release" "loki-stack" {
  name       = "loki"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "loki-stack"
  namespace  = "monitoring"
  version    = "2.10.2"
  set {
    name  = "loki.image.tag"
    value = "2.9.3"
  }
  set {
    name  = "promtail.enabled"
    value = "true"
  }
}

resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = "argocd"
  version    = "7.1.3"
}

resource "helm_release" "argocd-image-updater" {
  name       = "argocd-image-updater"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argocd-image-updater"
  namespace  = "argocd"
  version    = "0.10.2"
}

// minikube start --cni calico
// for EKS see:
// https://docs.tigera.io/calico/latest/getting-started/kubernetes/managed-public-cloud/eks
# resource "helm_release" "tigera-operator" {
#   name             = "tigera-operator"
#   repository       = "https://docs.tigera.io/calico/charts"
#   chart            = "tigera-operator"
#   namespace        = "tigera-operator"
#   version          = "3.28.0"
#   create_namespace = true
#   # Type could be "Calico" or "AmazonVPC"
#   values = [
#     <<EOF
#       {
#         "spec": {
#           "cni": {
#             "type": "AmazonVPC" 
#           }
#         }
#       }
#     EOF
#   ]
# }



