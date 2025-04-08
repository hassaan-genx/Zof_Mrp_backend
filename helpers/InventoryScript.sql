CREATE TABLE InventoryCategories (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  CreatedBy VARCHAR(100) DEFAULT NULL,
  UpdatedOn DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UpdatedBy VARCHAR(100) DEFAULT NULL,
  DeletedAt DATETIME DEFAULT NULL
);

CREATE TABLE InventorySubCategories (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  CategoryId INT NOT NULL,
  FOREIGN KEY (CategoryId) REFERENCES InventoryCategories(Id) ON DELETE CASCADE,
  CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  CreatedBy VARCHAR(100) DEFAULT NULL,
  UpdatedOn DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UpdatedBy VARCHAR(100) DEFAULT NULL,
  DeletedAt DATETIME DEFAULT NULL
);

CREATE TABLE InventorySuppliers (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  CreatedBy VARCHAR(100) DEFAULT NULL,
  UpdatedOn DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UpdatedBy VARCHAR(100) DEFAULT NULL,
  DeletedAt DATETIME DEFAULT NULL
);

CREATE TABLE InventoryItems (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(200) NOT NULL,
  ItemCode VARCHAR(20) NOT NULL UNIQUE,
  SubCategoryId INT NOT NULL,
  UnitOfMeasure VARCHAR(10) NOT NULL,
  SupplierId INT NULL,
  ReorderLevel DECIMAL(10,2) NULL,
  Stock DECIMAL(10,2) NULL,
  FOREIGN KEY (SubCategoryId) REFERENCES InventorySubCategories(Id) ON DELETE CASCADE,
  FOREIGN KEY (SupplierId) REFERENCES InventorySuppliers(Id) ON DELETE SET NULL,
  CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  CreatedBy VARCHAR(100) DEFAULT NULL,
  UpdatedOn DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UpdatedBy VARCHAR(100) DEFAULT NULL,
  DeletedAt DATETIME DEFAULT NULL
);

CREATE TABLE InventoryTransactions (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  InventoryItemId INT NOT NULL,
  Quantity DECIMAL(10,2) NOT NULL,
  TransactionType ENUM('IN', 'OUT', 'PRODUCTION', 'Opening Balance', 'Disposal') NOT NULL,
  TransactionDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (InventoryItemId) REFERENCES InventoryItems(Id) ON DELETE CASCADE,
  CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  CreatedBy VARCHAR(100) DEFAULT NULL,
  UpdatedOn DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UpdatedBy VARCHAR(100) DEFAULT NULL,
  DeletedAt DATETIME DEFAULT NULL
);

CREATE TABLE InventoryBillOfMaterials (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  FinishedGoodId INT NOT NULL,
  RawMaterialId INT NOT NULL,
  QuantityRequired DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (FinishedGoodId) REFERENCES InventoryItems(Id) ON DELETE CASCADE,
  FOREIGN KEY (RawMaterialId) REFERENCES InventoryItems(Id) ON DELETE CASCADE,
  CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  CreatedBy VARCHAR(100) DEFAULT NULL,
  UpdatedOn DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UpdatedBy VARCHAR(100) DEFAULT NULL
);

CREATE TABLE ProductionOrders (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  FinishedGoodId INT NOT NULL,
  QuantityToProduce DECIMAL(10,2) NOT NULL,
  ProductionDate DATETIME NOT NULL,
  IsCompleted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (FinishedGoodId) REFERENCES InventoryItems(Id) ON DELETE CASCADE,
  CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  CreatedBy VARCHAR(100) DEFAULT NULL,
  UpdatedOn DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UpdatedBy VARCHAR(100) DEFAULT NULL
);

CREATE TABLE ProductionConsumption (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  ProductionOrderId INT NOT NULL,
  RawMaterialId INT NOT NULL,
  QuantityUsed DECIMAL(10,2) NOT NULL,
  UsedDate DATETIME NOT NULL,
  FOREIGN KEY (ProductionOrderId) REFERENCES ProductionOrders(Id) ON DELETE CASCADE,
  FOREIGN KEY (RawMaterialId) REFERENCES InventoryItems(Id) ON DELETE CASCADE,
  CreatedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
  CreatedBy VARCHAR(100) DEFAULT NULL,
  UpdatedOn DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UpdatedBy VARCHAR(100) DEFAULT NULL
);
