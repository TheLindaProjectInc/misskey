/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { DI } from '@/di-symbols.js';
import type { ModerationLogsRepository } from '@/models/index.js';
import type { MiUser } from '@/models/entities/User.js';
import { IdService } from '@/core/IdService.js';
import { bindThis } from '@/decorators.js';

@Injectable()
export class ModerationLogService {
	constructor(
		@Inject(DI.moderationLogsRepository)
		private moderationLogsRepository: ModerationLogsRepository,

		private idService: IdService,
	) {
	}

	@bindThis
	public async insertModerationLog(moderator: { id: MiUser['id'] }, type: string, info?: Record<string, any>) {
		await this.moderationLogsRepository.insert({
			id: this.idService.genId(),
			createdAt: new Date(),
			userId: moderator.id,
			type: type,
			info: info ?? {},
		});
	}
}
