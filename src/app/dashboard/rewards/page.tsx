import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import {
  StripePortal,
  StripeSubscriptionCreationButton,
} from "@/components/submit-buttons";
import { unstable_noStore as noStore } from "next/cache";

const featureItems = [
  {
    name: "Kajian Tafsir Sabtu Pagi",
    time: "Pukul 06:00 WIB"
  },
  {
    name: "Kajian Hadits Ahad pagi",
    time: "Pukul 06:00 WIB"
  },
  {
    name: "Kajian Hikam Malam Selasa",
    time: "Pukul 20:00 WIB"
  },
  {
    name: "Kajian Maulid Addiba'i Malam Jum'at",
    time: "Pukul 19:00 WIB"
  },
  {
    name: "Kajian Pejuang Awal Bulan Hari Senin",
    time: " Pukul 09:00 WIB"
  },
];


export default async function RewardPage() {

  const data: any = []


  if (data?.status === "active") {
    return (
      <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <h1 className="text-3xl md:text-4xl ">Subscription</h1>
            <p className="text-lg text-muted-foreground">
              Settings reagding your subscription
            </p>
          </div>
        </div>

        <Card className="w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>Edit Subscription</CardTitle>
            <CardDescription>
              Click on the button below, this will give you the opportunity to
              change your payment details and view your statement at the same
              time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <form action={createCustomerPortal}>
              <StripePortal />
            </form> */}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Reward
            </h3>
          </div>

          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $30 <span className="ml-1 text-2xl text-muted-foreground">/Bulan</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Bagi Yang Rajin Ngaji Dan Nyatet
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {featureItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex flex-col">
                <p className="ml-3 text-base">{item.name}</p>
                <p className="ml-3 text-sm text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* <form className="w-full" action={createSubscription}>
            <StripeSubscriptionCreationButton />
          </form> */}
        </div>
      </Card>
    </div>
  );
}