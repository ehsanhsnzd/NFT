
# Build and start Docker containers
build:
	docker-compose up --build -d
	@echo "Running at http://localhost:3000/nft"
	@echo "Import Postman collection file from root NFT.postman_collection.json"

