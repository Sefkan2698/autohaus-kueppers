-- CreateTable
CREATE TABLE "new_models" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "new_models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "new_models_isActive_order_idx" ON "new_models"("isActive", "order");
