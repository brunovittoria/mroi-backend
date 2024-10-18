-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_stats" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "click_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "access_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "access_stats_destination_key" ON "access_stats"("destination");

-- AddForeignKey
ALTER TABLE "access_stats" ADD CONSTRAINT "access_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
