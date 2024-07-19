resource "aws_eks_cluster" "eks" {
  name     = local.eks_name
  version  = local.eks_version
  role_arn = aws_iam_role.eks.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.private_az1.id,
      aws_subnet.private_az2.id
    ]
  }

  access_config {
    authentication_mode                         = "API"
    bootstrap_cluster_creator_admin_permissions = true
  }


  depends_on = [aws_iam_role_policy_attachment.eks_policy]
}

# Used prefix instead of network interfaces for the ec2 instances of the worker nodes
# this will set the  pod limit / node in t3.medium instances from 17 to 110
resource "null_resource" "enable_prefix_delegation" {
  provisioner "local-exec" {
    command = <<EOT
      kubectl set env daemonset aws-node -n kube-system ENABLE_PREFIX_DELEGATION=true
    EOT

  }
  depends_on = [aws_eks_cluster.eks]
}



resource "aws_iam_role" "eks" {
  assume_role_policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
        {
          "Effect": "Allow",
          "Action": "sts:AssumeRole",
          "Principal": {
            "Service": "eks.amazonaws.com"
          }
        }
    ]
  }
  POLICY
}

resource "aws_iam_role_policy_attachment" "eks_policy" {
  role       = aws_iam_role.eks.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}
