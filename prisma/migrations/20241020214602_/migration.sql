/*
  Warnings:

  - A unique constraint covering the columns `[user_id,destination]` on the table `access_stats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "access_stats_destination_key";

-- CreateIndex
CREATE UNIQUE INDEX "access_stats_user_id_destination_key" ON "access_stats"("user_id", "destination");
