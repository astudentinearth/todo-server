-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL DEFAULT nextval('todos_id_seq'::regclass),
    "userID" TEXT NOT NULL,
    "content" VARCHAR(255),
    "completed" BOOLEAN,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "username" VARCHAR(32) NOT NULL,
    "hashed_password" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" TEXT NOT NULL,
    "userAgent" TEXT,
    "creationTime" TIMESTAMPTZ(6),

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todos_id_key" ON "todos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

