resource "aws_route_table" "private_rt_az1" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateway_az1.id
  }
}

resource "aws_route_table" "private_rt_az2" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gateway_az2.id
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }
}

resource "aws_route_table_association" "private_rta_az1" {
  route_table_id = aws_route_table.private_rt_az1.id
  subnet_id = aws_subnet.private_az1.id
}

resource "aws_route_table_association" "public_rta_az1" {
  route_table_id = aws_route_table.public_rt.id
  subnet_id = aws_subnet.public_az1.id
}

resource "aws_route_table_association" "private_rta_az2" {
  route_table_id = aws_route_table.private_rt_az2.id
  subnet_id = aws_subnet.private_az2.id
}

resource "aws_route_table_association" "public_rta_az2" {
  route_table_id = aws_route_table.public_rt.id
  subnet_id = aws_subnet.public_az2.id
}