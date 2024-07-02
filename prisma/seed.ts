const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  
  // Seeding data studies
  const study1 = await prisma.study.create({
    data: {
      name: "Study 1",
      link: "https://example.com/study1",
      material: "Material 1",
      datetime: new Date("2023-06-23T10:00:00Z"),
      userId: 1, // Assuming study1 is assigned to user1
    },
  });

  const study2 = await prisma.study.create({
    data: {
      name: "Study 2",
      link: "https://example.com/study2",
      material: "Material 2",
      datetime: new Date("2023-06-24T10:00:00Z"),
      userId: 1, // Assuming study2 is assigned to user2
    },
  });

  console.log({ study1, study2 });


  
  // const roleDeveloper = await prisma.role.create({
  //   data: {
  //     name: "DEVELOPER",
  //   },
  // });

  // const roleSuperAdmin = await prisma.role.create({
  //   data: {
  //     name: "SUPER_ADMIN",
  //   },
  // });

  // const roleAdmin = await prisma.role.create({
  //   data: {
  //     name: "ADMIN",
  //   },
  // });

  // const roleUser = await prisma.role.create({
  //   data: {
  //     name: "USER",
  //   },
  // });

  // console.log({ roleDeveloper, roleSuperAdmin, roleAdmin, roleUser });


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
