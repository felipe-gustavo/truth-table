type DependencesSet<
  Prev extends boolean = boolean,
  Next extends boolean = boolean
> = {
  prev: Prev;
  next: Next;
};

export default DependencesSet;
