type ListProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
  };
  
  export function List<T>({ items = [], renderItem }: ListProps<T>) {
    return (
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="p-4 bg-white rounded-2xl shadow-sm">
            {renderItem(item)}
          </li>
        ))}
      </ul>
    );
  }
  