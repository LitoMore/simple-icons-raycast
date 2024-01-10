import { useState } from "react";
import { ActionPanel, Action, Grid, Detail } from "@raycast/api";
import * as simpleIcons from "simple-icons";

export default function Command() {
  const [itemSize, setItemSize] = useState<Grid.ItemSize>(Grid.ItemSize.Small);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Grid
      itemSize={itemSize}
      inset={Grid.Inset.Small}
      isLoading={isLoading}
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="Grid Item Size"
          storeValue
          onChange={(newValue) => {
            setItemSize(newValue as Grid.ItemSize);
            setIsLoading(false);
          }}
        >
          <Grid.Dropdown.Item title="Small" value={Grid.ItemSize.Small} />
          <Grid.Dropdown.Item title="Medium" value={Grid.ItemSize.Medium} />
          <Grid.Dropdown.Item title="Large" value={Grid.ItemSize.Large} />
        </Grid.Dropdown>
      }
    >
      {!isLoading &&
        Object.entries(simpleIcons).map(([name, icon]) => (
          <Grid.Item
            key={name}
            content={{ value: { source: `icons/${icon.slug}.svg` }, tooltip: name }}
            title={icon.title}
            actions={
              <ActionPanel>
                <Action.Push
                  title="See Detail"
                  target={
                    <Detail
                      markdown={`<img src="icons/${icon.slug}.svg?raycast-width=325&raycast-height=325"/>`}
                      navigationTitle={icon.title}
                      metadata={
                        <Detail.Metadata>
                          <Detail.Metadata.Label title="Title" text={icon.title} />
                          <Detail.Metadata.Label title="Slug" text={icon.slug} />
                          <Detail.Metadata.TagList title="Brand color">
                            <Detail.Metadata.TagList.Item text={icon.hex} color={`#${icon.hex}`} />
                          </Detail.Metadata.TagList>
                          <Detail.Metadata.Separator />
                          <Detail.Metadata.Link title="Source" target={icon.source} text={icon.source} />
                          {icon.guidelines && (
                            <Detail.Metadata.Link title="Guidelines" target={icon.guidelines} text={icon.guidelines} />
                          )}
                        </Detail.Metadata>
                      }
                      actions={
                        <ActionPanel>
                          <Action.CopyToClipboard title="Copy SVG" content={icon.svg} />
                          <Action.CopyToClipboard
                            title="Copy CDN Link"
                            content={`https://cdn.simpleicons.org/${icon.slug}`}
                          />
                          <Action.CopyToClipboard title="Copy Color" content={icon.hex} />
                          <Action.CopyToClipboard title="Copy Slug" content={icon.slug} />
                        </ActionPanel>
                      }
                    />
                  }
                />
              </ActionPanel>
            }
          />
        ))}
    </Grid>
  );
}
