import { Controller, Get, Post, Body, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { Item } from './item.model';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

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
    findById(@Param('id', ParseUUIDPipe) id: string): Item {
        // serviceのメソッドにidを渡す
        return this.itemsService.findById(id)
    }

    @Post()
    // リクエストボディから商品のパラメータを取得する
    create(@Body() createItemDto: CreateItemDto): Item {
        return this.itemsService.create(createItemDto);
    }

    @Patch(':id')
    updateStatus(@Param('id', ParseUUIDPipe) id: string): Item {
        return this.itemsService.updateStatus(id);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string): void {
        return this.itemsService.delete(id);
    }
}
