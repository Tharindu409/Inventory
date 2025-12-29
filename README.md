📦 Smart Inventory & Support SystemA robust Full-Stack solution for modern warehouse management and streamlined customer communication. This project bridges the gap between inventory control and real-time support.🌟 Key Features🛠 Inventory ManagementDynamic CRUD: Manage products with real-time updates.Media Support: Multipart image uploads with live frontend previews.Smart Alerts: Automated low-stock visual indicators based on custom limits.Batch Actions: Global price adjustment tools for administrative efficiency.📩 Support EcosystemCustomer Portal: Integrated contact forms with automated database persistence.Admin Command Center: A dedicated inbox to read, archive, or delete inquiries.Tracking: "Read/Unread" status toggles for organized workflow.🔒 Security & ReliabilitySMTP Integration: Secure password recovery using JavaMailSender.Audit Trails: Detailed activity logs tracking every administrative change.🛠️ Tech StackLayerTechnologyFrontendReact.js, Tailwind CSS, Axios, React-IconsBackendSpring Boot 3, Spring Data JPA, HibernateSecurityJava Mail API (SMTP), UUID TokensDatabaseMySQL 8.0📂 Project StructurePlaintext├── backend/            # Spring Boot REST API
│   ├── src/main/java/  # Controllers, Models, Repositories, Services
│   ├── uploads/        # Local storage for product images
│   └── pom.xml         # Maven configuration
└── frontend/           # React.js SPA
    ├── src/components/ # Reusable UI elements
    ├── src/pages/      # Inventory & Admin Dashboard views
    └── package.json    # Node dependencies
⚙️ Setup & Installation1. Database ConfigurationCreate a MySQL schema named inventory_db.Update backend/src/main/resources/application.properties:Propertiesspring.datasource.url=jdbc:mysql://localhost:3306/inventory_db
spring.datasource.username=your_username
spring.datasource.password=your_password
# Ensure this is set to update for first run
spring.jpa.hibernate.ddl-auto=update
2. ExecutionRun Backend:Bashcd backend
./mvnw spring-boot:run
Run Frontend:Bashcd frontend
npm install
npm start
👤 AuthorTharindu * GitHub: @your-usernameRole: Full-Stack Developer
