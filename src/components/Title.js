import React from "react";
import { ThemeConsumer } from "../contexts/theme";

export default function Title({ title, link }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <>
          <a className={`title-${theme}`} href={link}>
            {title}
          </a>
        </>
      )}
    </ThemeConsumer>
  );
}
