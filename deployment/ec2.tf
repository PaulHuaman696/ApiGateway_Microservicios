resource "aws_key_pair" "ms_restaurante_key" {
  key_name   = "ms_restaurante_key"
  public_key = file("../ms_restaurante_key.pub")  # Ruta al archivo de clave pública generada
}

# Crear una instancia EC2
resource "aws_instance" "ec2_ms_restaurante" {
  ami           = "ami-0b4624933067d393a" # Cambia por una AMI válida en tu región
  instance_type = "t2.micro" 
  
  subnet_id = aws_subnet.public_a.id

  vpc_security_group_ids = [aws_security_group.security_group_example_app.id]

  # Asociar la clave SSH a la instancia
  key_name = aws_key_pair.ms_restaurante_key.key_name
  
  associate_public_ip_address = true

  # Etiquetas para organizar recursos
  tags = {
    Name = "MS-Restaurante"
  }

  user_data = <<-EOF
                #!/bin/bash
                # Utiliza esto para tus datos de usuario
                sudo yum update -y
                sudo yum install docker -y
                sudo systemctl start docker
                sudo systemctl enable docker
                sudo usermod -a -G docker ec2-user
                # Autenticación en Amazon ECR
                REGION="us-east-2"
                ECR_URL="235494813680.dkr.ecr.us-east-2.amazonaws.com"

                aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_URL

                # Descargar la imagen de ECR
                docker pull $ECR_URL/ecr_project_ms_restaurante_repo:reservas
                docker pull $ECR_URL/ecr_project_ms_restaurante_repo:graficos
                docker pull $ECR_URL/ecr_project_ms_restaurante_repo:clientes
                docker pull $ECR_URL/ecr_project_ms_restaurante_repo:frontend

                # Ejecutar el contenedor
                docker run -d --name ms_reservas -p 4000:4000 $ECR_URL/ecr_project_ms_restaurante_repo:reservas
                docker run -d --name ms_clientes -p 4001:4001 $ECR_URL/ecr_project_ms_restaurante_repo:clientes
                docker run -d --name ms_graficos -p 3005:3005 $ECR_URL/ecr_project_ms_restaurante_repo:graficos
                docker run -d --name ms_frontend -p 3001:3001 $ECR_URL/ecr_project_ms_restaurante_repo:frontend
                EOF
}