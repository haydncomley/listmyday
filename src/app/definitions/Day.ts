import { DateTime } from 'luxon';
import { IDay, IDayDataType, IDayEvent } from './IDay';

export class Day {
	private details!: IDay;

	constructor() {
		this.reset();
	}

	private reset() {
		this.details = {
			date: DateTime.now(),
			events: [],
			group: ''
		};
	}

	public ordinal(dayOfMonth: number) {
		const s = ['th', 'st', 'nd', 'rd'];
		const v = dayOfMonth%100;
		return (s[(v-20)%10] || s[v] || s[0]);
	}

	public load(path: string) {
		return new Promise<Day | null>((res) => {
			try {
				fetch(path).then((x) => {
					x.text().then((y) => {
						this.import(y);
						res(this);
					});
				});
			} catch {
				res(null);
			}
		});
	}

	public import(data: string, type: IDayDataType = 'listmydata') {
		switch (type) {
		default:
		case 'listmydata':
			return this.importLMD(data);
		}
	}

	private importLMD(data: string) {
		const lines = data.split('\n');
		try {
			const date = lines[0].includes('-') ? lines[0].split('-')[0].trim() : lines[0].trim();
			const group = lines[0].includes('-') ? lines[0].split('-')[1].trim() : null;

			const events = lines.slice(1).filter((x) => !!x);

			this.setDate(date);
			this.setGroup(group);
			this.setEvents(events.map((x) => this.parseLMDEvent(x)).filter((x) => !!x));
			return this;
		} catch {
			return null;
		}
	}

	private parseLMDEvent(day: string): IDayEvent {
		try {
			const eventDetails = day.split('\t:\t').map((x) => x.trim());
			const eventStart = eventDetails[0].split('-')[0].trim();
			const eventEnd = eventDetails[0].split('-')[1].trim();
			const eventStartTimestamp = this.details.date.set({
				hour: parseInt(eventStart.split(':')[0]),
				minute: parseInt(eventStart.split(':')[1]),
			});
			const eventEndTimestamp = this.details.date.set({
				hour: parseInt(eventEnd.split(':')[0]),
				minute: parseInt(eventEnd.split(':')[1]),
			});

			const peopleRegex = /\[(.*?)\]/gm;
			const test = eventDetails[1].match(peopleRegex);
			
			const people = test ? test[0].slice(1, -1).split(',').map((x) => x.trim()) : [];
			const message = !test ? eventDetails[1].trim() : eventDetails[1].replace(test[0], '').trim();

			return {
				duration_seconds: eventEndTimestamp.diff(eventStartTimestamp, 'seconds').seconds,
				end: eventEnd,
				end_timestamp: eventEndTimestamp,
				message,
				people,
				start: eventStart,
				start_timestamp: eventStartTimestamp
			}; 
		} catch (e) {
			return null as any;
		}
	}

	public export(type: IDayDataType = 'listmydata') {
		switch (type) {
		default:
		case 'listmydata':
			return this.exportLMD();
		}
	}

	private exportLMD() {
		let file = '';
		const date = this.getFormattedDate();
		const group = this.getGroup();

		file += `${date + (group ? ` - ${group}` : '')}\n\n`;
		this.getEvents().forEach((x) => {
			const line = `${x.start} - ${x.end}\t:\t${x.message}${ x.people.length > 0 ? ` [${x.people.join(', ')}]` : ''}\n`;
			file += (x.message.startsWith('Lunch') || x.message.startsWith('Break')) ? `\n${line}\n` : line;
		});
	
		return file;
	}

	public setGroup(group: string | null) {
		this.details.group = group || '';
		return this;
	}

	public getGroup() {
		return this.details.group;
	}
   
	public setDate(date: string) {
		try {
			const day = parseInt(date.slice(0, 4));
			const suffix = this.ordinal(day);

			this.details.date = DateTime.fromFormat(date, `dd'${suffix} of' MMMM yyyy`);
			return this;
		} catch {
			this.reset();
			return null;
		}
	}

	public getDate() {
		return this.details.date;
	}

	public setEvents(events: IDayEvent[]) {
		this.details.events = events;
		return this;
	}

	public pushEvents(event: IDayEvent) {
		this.details.events.push(event);
		return this;
	}

	public getEvents() {
		return this.details.events;
	}

	public getFormattedDate() {
		return `${this.details.date.toFormat(`dd'${this.ordinal(this.details.date.day)} of' MMMM yyyy`)}`;
	}

	public getNextAvailableEvent(): IDayEvent {
		const lastEvent = this.getEvents().slice(-1)[0];
		const now = DateTime.now();
		if (!lastEvent) {
			return {
				duration_seconds: 0,
				end: now.toFormat('hh:mm'),
				end_timestamp: now,
				message: 'New Event',
				people: [],
				start: now.toFormat('hh:mm'),
				start_timestamp: now
			};
		} else {
			return {
				duration_seconds: now.diff(lastEvent.end_timestamp, 'seconds').seconds,
				end: now.toFormat('hh:mm'),
				end_timestamp: now,
				message: 'New Event',
				people: [],
				start: lastEvent.end_timestamp.toFormat('hh:mm'),
				start_timestamp: lastEvent.end_timestamp
			};
		}
	}
}