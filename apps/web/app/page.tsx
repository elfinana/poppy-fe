"use client";

import { Button } from "@repo/ui";

import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Poppy Frontend</h1>
      <Button onClick={() => console.log("Pressed!")} text="Boop" />
    </div>
  );
}
