import Button from "../../base-components/Button";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "../../base-components/Form";

const CarReservationForm = (props: any) => {
  const {
    name,
    set_name,
    start_location,
    set_start_location,
    finish_location,
    set_finish_location,
    description,
    set_description,
    start_date,
    set_start_date,
    end_date,
    set_end_date,
    cancel,
    submit,
    isLoading,
  } = props;

  return (
    <div className="w-full box p-8">
      <form onSubmit={submit}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 ">
          <div>
            <div className="font-medium whitespace-nowrap">Name</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <p>{name}</p>
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">Lokasi penjemputan</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormInput
                formInputSize="sm"
                id="start_location"
                type="text"
                placeholder=""
                name="start_location"
                value={start_location}
                onChange={(e: any) => set_start_location(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">Lokasi tujuan</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormInput
                formInputSize="sm"
                id="finish_location"
                type="text"
                placeholder=""
                name="finish_location"
                value={finish_location}
                onChange={(e: any) => set_finish_location(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">Description/Keperluan</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormTextarea
                formTextareaSize="sm"
                id="description"
                placeholder="description"
                name="description"
                value={description}
                onChange={(e: any) => set_description(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">Tanggal Mulai</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormInput
                formInputSize="sm"
                id="start_date"
                type="datetime-local"
                placeholder=""
                name="start_date"
                value={start_date}
                onChange={(e: any) => set_start_date(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="font-medium whitespace-nowrap">Tanggal Mulai</div>
            <div className="mt-1 text-sm text-slate-500 pr-6">
              <FormInput
                formInputSize="sm"
                id="end_date"
                type="datetime-local"
                placeholder=""
                name="end_date"
                value={end_date}
                onChange={(e: any) => set_end_date(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-x-4">
          <Button 
            size="xs" 
            variant="secondary" 
            type="submit" 
            className="px-8"
            onClick={()=>cancel()}
            >
            Cancel
          </Button>
          <Button size="xs" variant="primary" type="submit" className="px-8">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CarReservationForm;
