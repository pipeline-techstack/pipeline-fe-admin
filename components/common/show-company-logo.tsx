import Image from "next/image";

const ShowCompanyLogo = ({ domain }: { domain: string }) => {
  let tdl = ".com";
  if (domain === "heyreach") {
    tdl = ".io";
  }
  return (
    <Image
      src={`https://img.logo.dev/${domain}${tdl}?token=pk_Kb7k9AFXSOiSQYm2mB1XLQ`}
      alt="logo"
      width={18}
      height={18}
      className="rounded-full"
    />
  );
};

export default ShowCompanyLogo;
