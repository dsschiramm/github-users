import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
	protected destroyed$: Subject<boolean> = new Subject();

	protected constructor() {}

	/**
	 * If any of the derived components implement their own ngOnDestroy can't forget this in the derived components.
	 * super.ngOnDestroy();
	 */
	ngOnDestroy(): void {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}
}
