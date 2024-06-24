resource "aws_eks_node_group" "node_group" {
  cluster_name = aws_eks_cluster.eks.name
  node_group_name = "eks-node-group"
  node_role_arn = aws_iam_role.eks_node_group.arn

  instance_types = ["t3.medium"]

  subnet_ids = [
    aws_subnet.private_az1.id,
    aws_subnet.private_az2.id
  ]

  scaling_config {
    desired_size = 1
    min_size = 1
    max_size = 2
  }

  depends_on = [ 
    aws_iam_role_policy_attachment.eks_worker_node_policy,
    aws_iam_role_policy_attachment.eks_cni_policy,
    aws_iam_role_policy_attachment.ecr_registry_policy
   ]
}

data "aws_iam_policy_document" "assume_node_role" {
  version = "2012-10-17"
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "eks_node_group" {
  assume_role_policy = data.aws_iam_policy_document.assume_node_role.json
}

resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.eks_node_group.name
}

resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.eks_node_group.name
}

resource "aws_iam_role_policy_attachment" "ecr_registry_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.eks_node_group.name
}