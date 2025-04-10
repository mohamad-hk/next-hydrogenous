"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
export default function BreadCrump({ title, category }) {
  let t_category = "";
  let name_category = "";
  if (category == 2) {
    t_category = "/products?category=ساشه";
    name_category="ساشه"
  } else {
    t_category = "/products?category=پودر";
    name_category="پودر"
  }
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">صفحه اصلی</BreadcrumbItem>
      <BreadcrumbItem href={t_category}>{name_category}</BreadcrumbItem>
      <BreadcrumbItem>{title}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
