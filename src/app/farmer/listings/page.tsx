
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Trash, Edit } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/use-translation';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const productListings = PlaceHolderImages.filter(p => ['tomatoes', 'onions', 'mango', 'okra', 'spinach'].includes(p.id)).map(p => ({
    ...p,
    status: p.id === 'mango' ? 'Draft' : 'Published',
    stock: 500,
    sales: 120,
}));

const statusVariant = {
  Published: 'secondary',
  Draft: 'outline',
} as const;

export default function FarmerListingsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Card>
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl md:text-2xl">{t('listings.title')}</CardTitle>
              <CardDescription>{t('listings.description')}</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />{' '}
                  {t('listings.addProductButton')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-md rounded-xl">
                <DialogHeader>
                  <DialogTitle>{t('listings.dialogTitle')}</DialogTitle>
                  <DialogDescription>
                    {t('listings.dialogDescription')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-name" className="text-right text-xs md:text-sm">
                      {t('listings.dialogNameLabel')}
                    </Label>
                    <Input
                      id="product-name"
                      placeholder={t('listings.dialogNamePlaceholder')}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right text-xs md:text-sm">
                      {t('listings.dialogDescriptionLabel')}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder={t('listings.dialogDescriptionPlaceholder')}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right text-xs md:text-sm">
                      {t('listings.dialogPriceLabel')}
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder={t('listings.dialogPricePlaceholder')}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right text-xs md:text-sm">
                      {t('listings.dialogStockLabel')}
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder={t('listings.dialogStockPlaceholder')}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter className="flex flex-row gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary" className="flex-1 sm:flex-none">
                      {t('listings.dialogCancelButton')}
                    </Button>
                  </DialogClose>
                  <Button type="button" className="flex-1 sm:flex-none">{t('listings.dialogSaveButton')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] md:w-[100px]">{t('listings.tableImage')}</TableHead>
                <TableHead>{t('listings.tableName')}</TableHead>
                <TableHead>{t('listings.tableStatus')}</TableHead>
                <TableHead className="hidden md:table-cell">
                  {t('listings.tablePrice')}
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  {t('listings.tableStock')}
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  {t('listings.tableSales')}
                </TableHead>
                <TableHead className="w-[50px]">
                  <span className="sr-only">{t('listings.tableActions')}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productListings.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="p-2 md:p-4">
                    <Image
                      alt={product.name || ''}
                      className="aspect-square rounded-md object-cover"
                      height="48"
                      src={product.imageUrl}
                      width="48"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-xs md:text-sm max-w-[100px] md:max-w-none truncate">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        statusVariant[product.status as keyof typeof statusVariant]
                      }
                      className="text-[10px] md:text-xs px-1.5 md:px-2.5"
                    >
                      {t(`listings.status${product.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    ₹{product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {product.stock} kg
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {product.sales} kg
                  </TableCell>
                  <TableCell className="p-2 md:p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">
                            {t('listings.toggleMenu')}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          {t('listings.tableActions')}
                        </DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          {t('listings.actionEdit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          {t('listings.actionDelete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
