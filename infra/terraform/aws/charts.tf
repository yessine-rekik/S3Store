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

# resource "kubernetes_namespace" "monitoring" {
#   metadata {
#     name = "monitoring"
#   }
# }

resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
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
  values           = [file("${path.module}/values/ingress-nginx.yml")]

  depends_on = [helm_release.aws_lbc]
}

# resource "helm_release" "kube-prometheus-stack" {
#   name       = "prometheus"
#   repository = "https://prometheus-community.github.io/helm-charts"
#   chart      = "kube-prometheus-stack"
#   namespace  = "monitoring"
#   version    = "60.2.0"

#   depends_on = [aws_eks_node_group.node_group]
# }

# resource "helm_release" "loki-stack" {
#   name       = "loki"
#   repository = "https://grafana.github.io/helm-charts"
#   chart      = "loki-stack"
#   namespace  = "monitoring"
#   version    = "2.10.2"
#   set {
#     name  = "loki.image.tag"
#     value = "2.9.3"
#   }
#   set {
#     name  = "promtail.enabled"
#     value = "true"
#   }

#   depends_on = [aws_eks_node_group.node_group]
# }

resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = "argocd"
  version    = "7.1.3"

  depends_on = [aws_eks_node_group.node_group]
}

resource "helm_release" "argocd-image-updater" {
  name       = "argocd-image-updater"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argocd-image-updater"
  namespace  = "argocd"
  version    = "0.10.2"

  depends_on = [aws_eks_node_group.node_group]
}

# minikube addons enable metrics-server
resource "helm_release" "metrics-server" {
  name       = "metrics-server"
  repository = "https://kubernetes-sigs.github.io/metrics-server"
  chart      = "metrics-server"
  namespace  = "kube-system"

  depends_on = [aws_eks_node_group.node_group]
}


