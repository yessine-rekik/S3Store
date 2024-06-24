resource "aws_eks_cluster" "eks" {
  name = local.eks_name
  version = local.eks_version
  role_arn = aws_iam_role.eks.arn

  vpc_config {
    subnet_ids = [ 
        aws_subnet.private_az1.id,
        aws_subnet.private_az2.id
     ]
  }

  depends_on = [ aws_iam_role_policy_attachment.eks_policy ]
}

data "aws_iam_policy_document" "assume_eks_role" {
  version = "2012-10-17"
  statement {
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["eks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "eks" {
  assume_role_policy = data.aws_iam_policy_document.assume_eks_role.json
  
  # assume_role_policy = <<POLICY
  # {
  #   "Version": "2012-10-17",
  #   "Statement": [
  #       {
  #         "Effect": "Allow",
  #         "Action": "sts:AssumeRole",
  #         "Principal": {
  #           "Service": "eks.amazonaws.com"
  #         }
  #       }
  #   ]
  # }
  # POLICY
}

resource "aws_iam_role_policy_attachment" "eks_policy" {
  role = aws_iam_role.eks.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}