import { useGetStatisticQuery } from "@/store/statistics/api";
import React from "react";

export const Content = () => {
  const { data, isLoading } = useGetStatisticQuery();

  return (
    <>
      <h1>Hello</h1>
    </>
  );
};
