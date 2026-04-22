import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import linkedinImg from "../../assets/linkedin.png";

const LinkedInBtn = ({ url }: { url: string }) => {
  return (
    <Button variant="ghost" size="sm" className="p-1 h-auto" asChild>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image
          src={linkedinImg}
          alt="LinkedIn"
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </a>
    </Button>
  );
};

export default LinkedInBtn;
