-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "country" TEXT,
    "location" TEXT,
    "gender" TEXT,
    "sessionId" TEXT NOT NULL,
    "visitStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitEnd" TIMESTAMP(3),
    "duration" INTEGER,
    "userAgent" TEXT,
    "referer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeDownload" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "country" TEXT,
    "location" TEXT,
    "userAgent" TEXT,
    "referer" TEXT,
    "downloadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeDownload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "element" TEXT,
    "metadata" TEXT,
    "ipAddress" TEXT NOT NULL,
    "country" TEXT,
    "location" TEXT,
    "sessionId" TEXT NOT NULL,
    "userAgent" TEXT,
    "referer" TEXT,
    "url" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visitor_ipAddress_idx" ON "Visitor"("ipAddress");

-- CreateIndex
CREATE INDEX "Visitor_sessionId_idx" ON "Visitor"("sessionId");

-- CreateIndex
CREATE INDEX "Visitor_createdAt_idx" ON "Visitor"("createdAt");

-- CreateIndex
CREATE INDEX "ResumeDownload_ipAddress_idx" ON "ResumeDownload"("ipAddress");

-- CreateIndex
CREATE INDEX "ResumeDownload_downloadedAt_idx" ON "ResumeDownload"("downloadedAt");

-- CreateIndex
CREATE INDEX "Interaction_type_idx" ON "Interaction"("type");

-- CreateIndex
CREATE INDEX "Interaction_action_idx" ON "Interaction"("action");

-- CreateIndex
CREATE INDEX "Interaction_sessionId_idx" ON "Interaction"("sessionId");

-- CreateIndex
CREATE INDEX "Interaction_timestamp_idx" ON "Interaction"("timestamp");

-- CreateIndex
CREATE INDEX "Interaction_ipAddress_idx" ON "Interaction"("ipAddress");
