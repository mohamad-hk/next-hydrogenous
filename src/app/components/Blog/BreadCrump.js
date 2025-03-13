"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
export default function BreadCrump({ title}) {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">صفحه اصلی</BreadcrumbItem>
      <BreadcrumbItem href="/blog">بلاگ</BreadcrumbItem>
      <BreadcrumbItem>{title}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
