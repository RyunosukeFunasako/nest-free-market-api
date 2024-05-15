import { Injectable } from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemsService {
    private items: Item[] = [];

    findAll(): Item[] {
        return this.items;
    }

    findById(id: string): Item {
        // 引数にコールバック関数を用意
        // itemのidが指定されたidと等しい時にTrueとなり、itemがリターンする
        return this.items.find((item) => item.id == id);
    }

    create(createItemDto: CreateItemDto): Item {
        const item: Item = {
            id: uuid(),
            // スプレッド構文でdtoを展開
            ...createItemDto,
            status: ItemStatus.ON_SALE,
        };
        this.items.push(item);
        return item;
    }

    updateStatus(id: string): Item {
        const item = this.findById(id);
        item.status = ItemStatus.SOLD_OUT;
        return item;
    }

    // Deleteの場合は何も返す必要がないので戻り値の型はvoid
    delete(id: string): void {
        // 指定したid以外の値のみを残す
        this.items = this.items.filter((item) => item.id != id);
    }
}
