import { Fragment, useState } from 'react';
import { Combobox, Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, Search } from 'lucide-react';

export function Select({ label, value, onChange, options, placeholder = 'Select...', required }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-10 text-left hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <span className={`block truncate ${!value ? 'text-slate-400' : ''}`}>
              {value || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-purple-50 text-purple-900' : 'text-slate-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                          <Check className="h-5 w-5" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export function SearchableSelect({ label, value, onChange, options, placeholder = 'Search...', required }) {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-slate-300 bg-white text-left hover:border-slate-400 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-0"
              displayValue={(option) => option}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Search className="h-5 w-5 text-slate-400" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-slate-500">
                  No results found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option}
                    value={option}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-purple-50 text-purple-900' : 'text-slate-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {option}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                            <Check className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
