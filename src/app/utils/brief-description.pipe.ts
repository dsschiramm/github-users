import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "briefDescription"
})
export class BriefDescription implements PipeTransform {
	transform(text: string, position: number): string {
		if (text.length > position) {
			return `${text.substr(0, position)}...`;
		}

		return text;
	}
}
