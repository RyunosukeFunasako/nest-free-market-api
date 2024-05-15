import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { Item } from './item.model';
import { ItemsService } from './items.service';
import { ItemStatus } from './item-status.enum';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    // idをパスとして受け取る
    // 「:」をつけることで可変になる
    @Get(':id')
    // パラメータをメソッド側で取得するために@Paramデコレーターを使う
    // 引数にキーを指定し、変数を定義する
    findById(@Param('id') id: string): Item {
        // serviceのメソッドにidを渡す
        return this.itemsService.findById(id)
    }

    @Post()
    // リクエストボディから商品のパラメータを取得する
    create(@Body('id') id: string,
           @Body('name') name: string,
           @Body('price') price: number,
           @Body('description') description: string,
           // statusは作成と同時に売り切れになることはないので、パラメータで受け取る必要がない
    ): Item {
        // Itemオブジェクトの作成
        // キーと変数の名前が同じなので省略できる
        const item: Item = {
            id,
            name,
            price,
            description,
            status: ItemStatus.ON_SALE,
        };
        return this.itemsService.create(item);
    }

    @Patch(':id')
    updateStatus(@Param('id') id: string): Item {
        return this.itemsService.updateStatus(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        return this.itemsService.delete(id);
    }
}
