
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

const tomatoImage = PlaceHolderImages.find(p => p.id === 'tomatoes');
const onionImage = PlaceHolderImages.find(p => p.id === 'onions');
const grapeImage = PlaceHolderImages.find(p => p.id === 'grapes');

const productListings = [
  {
    id: 'tomatoes',
    name: 'Desi Tomato',
    image: tomatoImage?.imageUrl || 'https://picsum.photos/seed/1/64/64',
    status: 'Published',
    price: 40,
    stock: 500, // in kg
    sales: 150, // in kg
  },
  {
    id: 'onions',
    name: 'Red Onion',
    image: onionImage?.imageUrl || 'https://picsum.photos/seed/2/64/64',
    status: 'Published',
    price: 50,
    stock: 800,
    sales: 320,
  },
  {
    id: 'grapes',
    name: 'Green Grapes',
    image: grapeImage?.imageUrl || 'https://picsum.photos/seed/3/64/64',
    status: 'Draft',
    price: 120,
    stock: 200,
    sales: 0,
  },
];

const statusVariant = {
  Published: 'secondary',
  Draft: 'outline',
} as const;

export default function FarmerListingsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('listings.title')}</CardTitle>
              <CardDescription>{t('listings.description')}</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />{' '}
                  {t('listings.addProductButton')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('listings.dialogTitle')}</DialogTitle>
                  <DialogDescription>
                    {t('listings.dialogDescription')}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-name" className="text-right">
                      {t('listings.dialogNameLabel')}
                    </Label>
                    <Input
                      id="product-name"
                      placeholder={t('listings.dialogNamePlaceholder')}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      {t('listings.dialogDescriptionLabel')}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder={t('listings.dialogDescriptionPlaceholder')}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
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
                    <Label htmlFor="stock" className="text-right">
                      {t('listings.dialogStockLabel')}
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder={t('listings.dialogStockPlaceholder')}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product-image" className="text-right">
                      Image
                    </Label>
                    <Input
                      id="product-image"
                      type="file"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      {t('listings.dialogCancelButton')}
                    </Button>
                  </DialogClose>
                  <Button type="button">{t('listings.dialogSaveButton')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] sm:table-cell">
                  {t('listings.tableImage')}
                </TableHead>
                <TableHead>{t('listings.tableName')}</TableHead>
                <TableHead>{t('listings.tableStatus')}</TableHead>
                <TableHead className="hidden md:table-cell">
                  {t('listings.tablePrice')}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t('listings.tableStock')}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t('listings.tableSales')}
                </TableHead>
                <TableHead>
                  <span className="sr-only">{t('listings.tableActions')}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productListings.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.image}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        statusVariant[product.status as keyof typeof statusVariant]
                      }
                    >
                      {t(`listings.status${product.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ₹{product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stock} kg
                  </TableCell>
                  <TableCell className="hidden md-table-cell">
                    {product.sales} kg
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
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
